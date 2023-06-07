"use strict";

const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const cookieParser = require("cookie-parser");

const { addUser, checkForUser } = require('../db/queries/users');
const { createPoll, getPoll } = require('../db/queries/polls');
const { castVote, getTotalRanking } = require('../db/queries/results');

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

router.get('/:id', (req, res) => {
  const id = req.params.id;

  getPoll(id)
    .then((data) => {
      return res.render('vote', { data });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/:id/vote', (req, res) => {
  const votes = req.params.body;  // need to test with working vote page
  votes.poll_id = req.params.id; // need to change castVote parameter (no poll id given from form)

  castVote(votes)
  .then((result) => {
    return res.render('results', { result }) //not sure if we want it to render results
  })
  .catch((err) => {
    console.log(err);
  });
})

router.get('/:id/result', (req, res) => {

  // temp code to format front end
  // add .then, .catch to getTotalRanking function
  const id = req.params.id;

  getTotalRanking(id)
  .then((result) => {
    return res.render('result', { result });
  })
  .catch((err) => {
    console.log(err);
  });
})

module.exports = router;
