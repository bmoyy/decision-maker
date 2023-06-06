const db = require('../connection');

const createPoll = (poll) => {
  const newPoll = [poll.title, poll.description, poll.choice_1, poll.choice_2, poll.choice_3, poll.user_id];
  return db.query(`
    INSERT INTO polls (title, description, choice_1, choice_2, choice_3, user_id)
    VALUES ($1, $2, $3, $4, $5, $6)
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
module.exports = { createPoll, getPoll };
