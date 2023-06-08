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

const checkForUser = (user) => {
  return db.query(`SELECT id FROM users WHERE email = $1;`, [user.email])
  .then((result) => {
    return (result.rows);
  })
  .catch((err) => {
    console.log(err.message);
  })
}
const checkUserId = (user) => {
  return db.query(`SELECT * FROM users WHERE id = $1;`, [user.id])
  .then((result) => {
    return (result.rows);
  })
  .catch((err) => {
    console.log(err.message);
  })
}


module.exports = { addUser, getUsers, checkForUser,checkUserId };
