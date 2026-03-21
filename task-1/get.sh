
USER_ID=11  

curl -X GET http://localhost:3000/users/$USER_ID \
-H "Content-Type: application/json"