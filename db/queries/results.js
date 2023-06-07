const db = require('../connection');

// front end assigns borda value from the ordering of the choices

const castVote = (votes) => {
  const vote = [votes.borda_value_1, votes.borda_value_2, votes.borda_value_3, votes.poll_id];
  return db.query(`
    INSERT INTO results (borda_value_1, borda_value_2, borda_value_3, poll_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`, vote)
    .then((result) => {
      return (result.rows);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getTotalRanking = (poll_id) => {
  return db.query(`
  SELECT SUM(results.borda_value_1) as total_choice_1, SUM(results.borda_value_2) as total_choice_2, SUM(results.borda_value_3) as total_choice_3 FROM results
  WHERE poll_id = $1;`, [poll_id])
    .then((result) => {
      return (result.rows);
    })
    .catch((err) => {
      console.log(err.message);
    });
};


module.exports = { castVote, getTotalRanking };
