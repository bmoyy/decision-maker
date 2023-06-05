# Routes

Purpose - Method - Path 
Browse - GET - /polls
Read - GET - /polls/:id
Edit - PATCH - /polls/:id
Add - POST - /polls

- User loads app & form to enter email to create poll -> GET to /polls
- User enters email and submits email form -> POST to /polls/email
- User is redirected to poll creation form -> redirect to /polls with cookie

- User submits poll creation form -> POST to /polls
- User can click Start Again to create a new poll -> redirect to /polls

- Voter looks at poll via link -> GET /polls/:id
- Voter submits their ranking of poll -> PATCH /polls/:id
- Voter redirected to either thank you message or results

- User views results of poll -> /polls/:id/results
