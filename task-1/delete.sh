
USER_ID=11  

curl -X DELETE http://localhost:3000/users/$USER_ID \
-H "Content-Type: application/json"