"use strict";

//mailgun
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});


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
      mg.messages.create(`${process.env.MAILGUN_API_URL}`, {
        from: `Decision Maker <mailgun@${process.env.MAILGUN_API_URL}>`,
        to: [`${user.email}`],
        subject: "Thank you for using Decision Maker!",
        text: "Provided below are your links to vote and view poll results!",
        html: `<p>Provided below are your links to view poll results and vote!</p>
        <h3>Finally, we'll have an answer to the question: ${poll[0].title}</h3>
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
      borda_value_1 =  votesArray.length - Number(index);
    }
    if (votesArray[index] === 'choice-two') {
      borda_value_2 = votesArray.length - Number(index);
    }
    if (votesArray[index] === 'choice-three') {
      borda_value_3 = votesArray.length - Number(index);
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
  let choices = [];
  let bordaSum = [];
  getPoll(id)
  .then((data) => {
    const pollObj = data[0];
    getTotalRanking(id)
    .then((result) => {
      return res.render('result', { result, pollObj, choices, bordaSum });
    })
    .catch((err) => {
      console.log(err);
    });
  })
  .catch((err) => {
    console.log(err);
  });


})

module.exports = router;
