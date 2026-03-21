


USER_ID=11  

curl -X PATCH http://localhost:3000/users/$USER_ID \
-H "Content-Type: application/json" \
-d '{
  "email": "johndoe@example.com"
}'