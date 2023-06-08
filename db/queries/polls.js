const db = require('../connection');
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

const createPoll = (poll) => {
  const newPoll = [poll.title, poll.description, poll.choice_1, poll.choice_2, poll.choice_3, poll.require_name, poll.user_id];
  return db.query(`
    INSERT INTO polls (title, description, choice_1, choice_2, choice_3, require_name, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;`, newPoll)
    .then((result) => {
      return (result.rows);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getPoll = (id) => {
  return db.query(`
  SELECT * from polls
  WHERE polls.id = $1;`, [id])
.then((result) => {
  return (result.rows);
})
.catch((err) => {
  console.log(err.message);
});
};

const savePoll = function(pollData, user, res) {
  createPoll(pollData)
  .then((poll) => {

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
}

module.exports = { createPoll, getPoll, savePoll };

