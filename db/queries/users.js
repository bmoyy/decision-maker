const db = require('../connection');

const addUser = (user) => {
  const newUser = [user.email, user.name];
  return db.query(`
    INSERT INTO users (email, name)
    VALUES ($1, $2)
    RETURNING *;`, newUser)
    .then((result) => {
      return (result.rows);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { addUser, getUsers };
