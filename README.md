# Core program week X assignment

Core Program week 9 assignment

## Implementation Instructions

### Task 1

In this task you will practice reading API documentation and using `curl`. The API reference you need is in the [GUIDE.md](task-1/GUIDE.md) file. Read it carefully and construct your own `curl` requests from the endpoint details.

Before you start, open a terminal in the repository root and start the server with `npm start`. Keep it running while you work.

Create your scripts inside the `task-1` folder and run each script with `bash` after you finish it. If a command fails, compare your request to the examples in the [GUIDE](task-1/GUIDE.md).

1. Create a `post.sh` bash script. It must send a POST request with `curl` to create a new user. Use these values in the JSON body:

    | Field | Value |
    | ----- | ----- |
    | name | John Doe |
    | email | john.doe@example.com |
    | role | user |
    | active | true | 
    | department | Engineering |

    Run the script. Record the `id` in the response. You will use it in the next steps.

2. The email address from the previous step mistakenly includes an extra dot between first and last name. We will correct it here. Create a `patch.sh` bash script. It must send a `curl` PATCH request to update only the email for the user you just created. Fix the email by removing the extra dot, changing it to `johndoe@example.com`. Note a PATCH request should include only the field you are updating, in our case this is the `email` field only.

3. Create a `get.sh` script. It must send a `curl` GET request to fetch the user by `id`. Verify the response contains the updated email.

4. Create `delete.sh` script. It must send a `curl` DELETE request for the same `id` to remove the user.

5. Re-run the `get.sh` script. The response should now be `User not found`.

### Task 2

Instructions for Task 2

...
