"use strict";

const express = require('express');
const router = express.Router();
const db = require('../db/connection');

const app = express();

// GET /polls
// User loads app & form to enter email to create poll
router.get('/', (req, res) => {
  if (!req.cookies.userId) {
    return res.redirect('/')
  }
  res.render('polls');
});

// POST /polls/email
// User enters email and submits email form
router.post('/email', (req, res) => {
  const userEmail = req.body.email;

  db.query(
    'SELECT id FROM users WHERE email = $1', [userEmail]
  ).then((results) => {
    if (results.rows[0] && results.rows[0].id) {
      return res.cookies('userId', results.rows[0].id).status(201).end();
    } else {
      return db.query(
        'INSERT INTO users (email) VALUES ($1) RETURNING id', [userEmail]
      ).then((results) => {
        if (results.rows[0] && results.rows[0].id) {
          res.cookies('user_id', results.rows[0].id).status(201).end();
        }
      })
    }
  }).catch((error) => {
    res.status(500).end(error);
  })

  res.redirect('/polls');
});


module.exports = router;
