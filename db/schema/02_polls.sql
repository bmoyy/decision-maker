DROP TABLE IF EXISTS polls CASCADE;

CREATE TABLE polls (
  id SERIAL PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  choice_1 TEXT,
  choice_2 TEXT,
  choice_3 TEXT,
  user_id INTEGER REFERENCES users(id)
);
