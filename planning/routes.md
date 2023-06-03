# Routes
# SPA 

Purpose - Method - Path 
Browse - GET - /poll
Read - GET - /poll/:id
Edit - PATCH - /poll/:id
Add - POST - /poll

- User loads app & form to create poll -> GET to /poll
- User submits creation of a poll -> POST to /poll
- User looks at poll via link -> GET /poll/:id
- User drags options around to rank them -> PATCH /poll/:id
- User submits new ranking of poll -> PATCH /poll/:id
