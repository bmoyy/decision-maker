"use strict";

//mailgun
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: 'cac8127d7c1c3099ccc23fc61e41d999-6d1c649a-3d913324'});


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

      //sends email to creator
      mg.messages.create('sandboxaec54a8b2ab745aba97cc44960e92776.mailgun.org', {
        from: "Decision Maker <mailgun@sandboxaec54a8b2ab745aba97cc44960e92776.mailgun.org>",
        to: [`${user.email}`],
        subject: "Thank you for using Decision Maker!",
        text: "Provided below are your links to vote and view poll results!",
        html: `<p>Provided below are your links to view poll results and vote!</p>
        <a href="http://localhost:8080/polls/${poll[0].id}">Vote on Poll</a>
        <br>
        <a href="http://localhost:8080/polls/${poll[0].id}/result">Poll results</a>`
      })
      .then(msg => console.log(msg))
      .catch(err => console.log(err));

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
  let borda_value_1 = 0;
  let borda_value_2 = 0;
  let borda_value_3 = 0;
  const poll_id = req.params.id;
  const votesArray = req.body.choicesRanked.split(',');
  for (let index in votesArray) {
    if (votesArray[index] === 'choice-one') {
      borda_value_1 =  Number(index) + 1;
    }
    if (votesArray[index] === 'choice-two') {
      borda_value_2 = Number(index) + 1;
    }
    if (votesArray[index] === 'choice-three') {
      borda_value_3 = Number(index) + 1;
    }
  }
  const votes = {
    borda_value_1,
    borda_value_2,
    borda_value_3,
    poll_id
  };
  castVote(votes)
  .then(() => {
    res.redirect(`/polls/${poll_id}/result`);
  })
  .catch((err) => {
    console.log(err);
  });
})

router.get('/:id/result', (req, res) => {
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
