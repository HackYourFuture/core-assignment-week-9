# Assignment Instructions

## Task 1 — curl commands

In this task you will practice reading API documentation and using **curl**. The API reference you need is in the [README_API](README_API.md) file of task-1 in the assignment repository. Read it carefully and construct your own **curl** requests from the endpoint details.

Before you start, open a terminal in the repository root and start the server with `npm start`. Keep it running while you work.

Create your scripts inside the `task-1` folder and run each script with `bash` after you finish it.

1. Create a `post.sh` bash script. It must send a `POST` request with **curl** to create a new user. Use these values in the JSON body:

   | Field               | Value                |
   | ------------------- | -------------------- |
   | name (string)       | John Doe             |
   | email (string)      | john.doe@example.com |
   | password (string)   | secret123            |
   | role (string)       | user                 |
   | active (boolean)    | true                 |
   | department (string) | Engineering          |

   Run the script. Record the `id` from the response. You will need it in the next steps.

2. The email address from the previous step mistakenly included an extra dot between first and last name. We will correct it here. Create a `patch.sh` bash script. It must send a **curl** `PATCH` request to update the email address for the user you just created. Fix the email by removing the extra dot, changing it to `johndoe@example.com`. Note that in general, a `PATCH` request should include only the fields you are updating. In our case this is the `email` field only.
3. Create a `get.sh` script. It must send a **curl** `GET` request to fetch the user by `id`. Verify the response contains the updated email.
4. Create a `delete.sh` script. It must send a **curl** `DELETE` request for the same `id` to remove the user.
5. Re-run the `get.sh` script. The response should now be "User not found".

When you are satisfied with the results of your bash scripts, you can verify that Task 1 will successfully pass all tests performed by the auto-grading facility when you submit your pull request. To do so, open a second terminal window and type the command:

```bash
npm run test:task-1
```

If all is well you see output similar to this:

```
> core-assignment-week-9@1.0.0 test:task-1
> vitest --run tests/task-1.test.js

 RUN  v4.0.18 /Volumes/Crucial2TB/xdev/hackyourfuture/core-assignment-week-9

 ✓ tests/task-1.test.js (9 tests) 149ms
   ✓ curl scripts (9)
     ✓ post.sh: Script exists 0ms
     ✓ post.sh: Create user John Doe 74ms
     ✓ patch.sh: Script exists 0ms
     ✓ patch.sh: Correct the email address 20ms
     ✓ get.sh: Script exists 0ms
     ✓ get.sh: Retrieve user John Doe details 18ms
     ✓ delete.sh: Script exists 0ms
     ✓ delete.sh: Delete user John Doe 19ms
     ✓ get.sh: Verify user John Doe has been deleted 17ms

 Test Files  1 passed (1)
      Tests  9 passed (9)
   Start at  16:35:08
   Duration  233ms (transform 9ms, setup 0ms, import 14ms, tests 149ms, environment 0ms)

```

When you have completed all steps, stop the server with `Ctrl-C` in the terminal window where you started the server.
