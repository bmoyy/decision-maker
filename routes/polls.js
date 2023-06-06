"use strict";

const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const cookieParser = require("cookie-parser");

const { addUser, checkForUser } = require('../db/queries/users');

const app = express();
app.use(cookieParser());
app.set('view engine', 'html');

// GET /polls
// User loads app & form to enter email to create poll
router.get('/', (req, res) => {
  if (!req.cookies.userEmail) {
    return res.redirect('/');
  }
  res.render('polls');
});


// POST /polls/email
// User enters email and submits email form
router.post('/email', (req, res) => {
  const userEmail = req.body.email;
  const user = {email: userEmail};

checkForUser(user).then((result) => {
    if (!result.id) {
      // addUser(user)
      // .then((data) => {
      //   res.cookie('userID',data[0].id);
      //   console.log(data[0].id);
      // })
      // .catch((err) => {
      //   console.log(err);
      // })
      addUser(user);
      res.cookie('userEmail', userEmail);
      return res.redirect('/polls');
    }
    req.cookies.userId = result.id;
    return res.redirect('/polls');
  }).catch((err) => {
    console.log(err);
  });

  // db.query(
  //   'SELECT id FROM users WHERE email = $1', [userEmail]
  // ).then((results) => {
  //   if (results.rows[0] && results.rows[0].id) {
  //     return res.cookies('userId', results.rows[0].id).status(201).end();
  //   } else {
  //     return db.query(
  //       'INSERT INTO users (email) VALUES ($1) RETURNING id', [userEmail]
  //     ).then((results) => {
  //       if (results.rows[0] && results.rows[0].id) {
  //         res.cookies('user_id', results.rows[0].id).status(201).end();
  //       }
  //     })
  //   }
  // }).catch((error) => {
  //   res.status(500).end(error);
  // })
});


module.exports = router;
