const db = require('../connection');

// front end assigns borda value from the ordering of the choices

const castVote = (votes) => {
  const vote = [votes.borda_value_1, votes.borda_value_2, votes.borda_value_3, votes.poll_id];
  return db.query(`
    INSERT INTO results (borda_value_1, borda_value_2, borda_value_3, poll_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`, vote)
    .then((result) => {
      console.log(result.rows);
      return (result.rows);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// front end calls this function three times, one for each choice.  the choice is borda_value_1, borda_value_2, borda_value_3
const getSumOfChoice = (choice, poll_id) => {
  return db.query(`
  SELECT SUM($1) FROM results
  WHERE poll_id = $2;`, [choice, poll_id])
};


module.exports = { castVote, getSumOfChoice };


