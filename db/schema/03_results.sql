DROP TABLE IF EXISTS results CASCADE;

CREATE TABLE results (
  id SERIAL PRIMARY KEY NOT NULL,
  borda_value_1 INTEGER NOT NULL,
  borda_value_2 INTEGER NOT NULL,
  borda_value_3 INTEGER NOT NULL,
  poll_id INTEGER REFERENCES polls(id)
);
