# Routes
# SPA 

Purpose - Method - Path 
Browse - GET - /polls
Read - GET - /polls/:id
Edit - PATCH - /polls/:id
Add - POST - /polls

- User loads app & form to enter email to create poll -> GET to /polls
- User enters email and submits form -> POST to /polls

- User is redirected to poll creation form -> GET to /polls/:id
- User submits poll creation form -> POST to /polls/:id
- User can click Start Again to create a new poll -> GET to /polls

- User looks at poll via link -> GET /polls/:id
- User submits theirr ranking of poll -> PATCH /polls/:id
