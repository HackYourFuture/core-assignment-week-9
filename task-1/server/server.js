import bcrypt from 'bcrypt';
import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;
const usersFilePath = join(__dirname, 'users.json');

app.use(morgan('dev'));
app.use(express.json());

// Set global JSON indentation to 2 spaces
app.set('json spaces', 2);

// Helper function to read users from the JSON file
const readUsers = () => {
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data).users;
};

// Helper function to write users to the JSON file
const writeUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify({ users }, null, 2));
};

// GET all users
app.get('/users', (req, res) => {
  const users = readUsers().map(({ password, ...user }) => user); // Exclude password
  res.json(users);
});

// GET a user by ID
app.get('/users/:id', (req, res) => {
  const users = readUsers();
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    const { password, ...userWithoutPassword } = user; // Exclude password
    res.json(userWithoutPassword);
  } else {
    res.status(404).send('User not found');
  }
});

// CREATE a new user
app.post('/users', async (req, res) => {
  const { name, email, password, role, department } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const users = readUsers();
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    name,
    email,
    password: hashedPassword,
    role,
    active: true,
    createdAt: new Date().toISOString(),
    lastLogin: null,
    department,
  };
  users.push(newUser);
  writeUsers(users);
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
});

// UPDATE a user by ID
app.put('/users/:id', async (req, res) => {
  const users = readUsers();
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex !== -1) {
    const { name, email, password, role, department } = req.body;
    const updatedUser = {
      ...users[userIndex],
      name,
      email,
      role,
      department,
      ...(password && { password: await bcrypt.hash(password, 10) }), // Update password if provided
    };
    users[userIndex] = updatedUser;
    writeUsers(users);
    const { password: _, ...userWithoutPassword } = updatedUser;
    res.json(userWithoutPassword);
  } else {
    res.status(404).send('User not found');
  }
});

// PATCH a user by ID (partial update)
app.patch('/users/:id', async (req, res) => {
  const users = readUsers();
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex !== -1) {
    const { id, createdAt, ...updates } = req.body;
    // If password is provided, hash it
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const updatedUser = {
      ...users[userIndex],
      ...updates,
    };
    users[userIndex] = updatedUser;
    writeUsers(users);
    const { password: _, ...userWithoutPassword } = updatedUser;
    res.json(userWithoutPassword);
  } else {
    res.status(404).send('User not found');
  }
});

// DELETE a user by ID
app.delete('/users/:id', (req, res) => {
  const users = readUsers();
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    writeUsers(users);
    // Note: The test expects a 200 status code with a success message, but
    // typically a 204 No Content is used for successful deletions without
    // a response body.
    // res.status(204).send();
    res.status(200).send('User deleted successfully');
  } else {
    res.status(404).send('User not found');
  }
});

app.listen(PORT, () => {
  console.log(chalk.green(`Server is running on http://localhost:${PORT}`));
  console.log(chalk.yellow('Press Ctrl+C to stop the server'));
});
