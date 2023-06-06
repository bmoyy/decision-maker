"use strict";

const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const cookieParser = require("cookie-parser");

const { addUser, checkForUser } = require('../db/queries/users');
const { createPoll, getPoll } = require('../db/queries/polls');

const app = express();
app.use(cookieParser());

let userEmail = '';

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
  userEmail = req.body.email;
  const user = { email: userEmail };

  checkForUser(user).then((result) => {
    if (!result.id) {
      addUser(user);
      res.cookie('userEmail', userEmail);
      return res.redirect('/polls');
    }
    req.cookies.userId = result.id;
    return res.redirect('/polls');
  }).catch((err) => {
    console.log(err);
  });
});

router.post('/', (req, res) => {
  const pollData = req.body;
  const user = { email: userEmail };

  checkForUser(user)
    .then((result) => {
      pollData.user_id = result[0].id;
    })
    .catch((err) => {
      console.log(err.message);
    });

  createPoll(pollData)
    .then((poll) => {
      return res.render('link', { poll });
    })
    .catch((err) => {
      console.log(err);
    });

});

// placeholder
router.get('/:id', (req, res) => {
  const id = req.params.id;

  getPoll(id)
    .then((data) => {
      console.log(data);
      return res.render('vote', { data });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
