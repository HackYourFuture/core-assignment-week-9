#!/bin/bash

curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json; charset=UTF-8" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "secret",
    "role": "user",
    "active": true,
    "department": "Engineering"
  }'
