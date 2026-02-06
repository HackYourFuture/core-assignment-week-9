import { exec } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { promisify } from 'util';
import { beforeAll, describe, expect, test } from 'vitest';

const execPromise = promisify(exec);

const scriptDir = path.join(__dirname, '../task-1');
const serverDir = path.join(__dirname, '../task-1/server');

beforeAll(() => {
  const seedJson = readFileSync(path.join(__dirname, 'seed.json'), 'utf-8');
  writeFileSync(path.join(serverDir, 'users.json'), seedJson, 'utf-8');
});

describe('curl scripts', () => {
  test('post.sh: Script exists', async () => {
    const fileExists = existsSync(path.join(scriptDir, 'post.sh'));
    expect(fileExists).toBe(true);
  });

  test('post.sh: Create user John Doe', async () => {
    const { stdout } = await execPromise(
      `bash ${path.join(scriptDir, 'post.sh')}`
    );
    try {
      const user = JSON.parse(stdout);
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name', 'John Doe');
      expect(user).toHaveProperty('email', 'john.doe@example.com');
      expect(user).toHaveProperty('role', 'user');
      expect(user).toHaveProperty('active', true);
      expect(user).toHaveProperty('department', 'Engineering');
    } catch (error) {
      throw new Error(`Failed to parse JSON: ${error.message}`);
    }
  });

  test('patch.sh: Script exists', async () => {
    const fileExists = existsSync(path.join(scriptDir, 'patch.sh'));
    expect(fileExists).toBe(true);
  });

  test('patch.sh: Correct the email address', async () => {
    const { stdout } = await execPromise(
      `bash ${path.join(scriptDir, 'patch.sh')}`
    );
    try {
      const user = JSON.parse(stdout);
      expect(user).toHaveProperty('email', 'johndoe@example.com');
    } catch (error) {
      throw new Error(`Failed to parse JSON: ${error.message}`);
    }
  });

  test('get.sh: Script exists', async () => {
    const fileExists = existsSync(path.join(scriptDir, 'get.sh'));
    expect(fileExists).toBe(true);
  });

  test('get.sh: Retrieve user John Doe details', async () => {
    const { stdout } = await execPromise(
      `bash ${path.join(scriptDir, 'get.sh')}`
    );
    try {
      const user = JSON.parse(stdout);
      expect(user).toHaveProperty('id', 11);
    } catch (error) {
      throw new Error(`Failed to parse JSON: ${error.message}`);
    }
  });

  test('delete.sh: Script exists', async () => {
    const fileExists = existsSync(path.join(scriptDir, 'delete.sh'));
    expect(fileExists).toBe(true);
  });

  test('delete.sh: Delete user John Doe', async () => {
    const { stdout } = await execPromise(
      `bash ${path.join(scriptDir, 'delete.sh')}`
    );
    try {
      expect(stdout).toBe('User deleted successfully');
    } catch (error) {
      throw new Error(`Failed to parse JSON: ${error.message}`);
    }
  });

  test('get.sh: Verify user John Doe has been deleted', async () => {
    const { stdout } = await execPromise(
      `bash ${path.join(scriptDir, 'get.sh')}`
    );
    expect(stdout).toBe('User not found');
  });
});
