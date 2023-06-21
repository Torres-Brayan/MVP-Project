DROP TABLE IF EXISTS favorite_soccer_players;
DROP TABLE IF EXISTS users;



-- Create the Player table
CREATE TABLE favorite_soccer_players (
  player_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  team VARCHAR(255) NOT NULL,
  number INTEGER NOT NULL
);
