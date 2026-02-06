#!/bin/bash

curl -X PATCH http://localhost:3000/users/11 \
  -H "Content-Type: application/json; charset=UTF-8" \
  -d '{
    "email": "johndoe@example.com"
  }'
