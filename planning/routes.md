# Routes

Purpose - Method - Path 
Browse - GET - /polls
Read - GET - /polls/:id
Edit - PATCH - /polls/:id
Add - POST - /polls

- User loads app & form to enter email to create poll -> GET to /
- User enters email and submits email form -> POST to /polls/email
    - User is redirected to poll creation form with cookie -> redirect to /polls
- User arrives at /polls -> GET to /polls

- If user without a cookie attempts to access /polls, redirect to /

- User submits poll creation form -> POST to /polls
    - Response from POST to /polls is the ID of the newly created poll
    - User is presented with two links:
        - /polls/:id - for sharing the poll
        - /polls/:id/results - to view results
    - User can click Start Again to create a new poll -> redirect to /polls
    - Redirect to /polls/:id

- Voter looks at poll via link -> GET to /polls/:id
    - Need templateVars to determine whether or not to show Share button
- Voter submits their ranking of poll -> POST to /polls/:id/vote
    - Voter is redirected to /polls/:id/results
