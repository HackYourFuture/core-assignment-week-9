# Users API — Usage Guide

This guide describes the users API backed by the local users.json file. It explains the endpoints, required data, and expected behavior so you can build your own requests

Base URL: <http://localhost:3000>

All requests that send a body must use JSON and include the header:

- Content-Type: `application/json; charset=UTF-8`

> [!NOTE]
> In the PATH specifications below, `:id` indicates a path parameter that should be replaced with the actual user ID number.

## Get a single user

- Method: `GET`
- Path: `/users/:id`

Response: a single user object (without `password`) or the text `User not found`.

## List all users

- Method: `GET`
- Path: `/users`

Response: an array of users (without `password`).

## Create a user

- Method: `POST`
- Path: `/users`
- Body: JSON with the following fields:
  - `name` (string)
  - `email` (string)
  - `password` (string, required)
  - `role` (string)
  - `active` (boolean)
  - `department` (string)

Example body:

    {
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "password": "secret123",
      "role": "user",
      "active": true,
      "department": "Engineering"
    }

Response: the created user (without `password`) and a generated `id`.

## Update a user (replace all fields)

- Method: `PUT`
- Path: `/users/:id`
- Body: JSON with the full user object (all fields you want to keep must be included).

Example body:

    {
      "name": "Alice Johnson",
      "email": "alice.johnson@example.com",
      "password": "new-secret",
      "role": "admin",
      "active": true,
      "department": "Engineering"
    }

Response: the updated user (without `password`).

## Patch a user (partial update)

- Method: `PATCH`
- Path: `/users/:id`
- Body: JSON with only the fields you want to change.

Example body:

    {
      "email": "alice.updated@example.com"
    }

Response: the updated user (without `password`).

## Delete a user

- Method: `DELETE`
- Path: `/users/:id`

Response: no content on success.

## Notes

- Passwords are never returned in API responses.
- The server hashes the `password` you send in POST, PUT, or PATCH requests.
