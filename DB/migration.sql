DROP TABLE IF EXISTS favorite_soccer_players;

CREATE TABLE favorite_soccer_players (
    name varchar(50) PRIMARY KEY,
    number integer,
    position varchar(50),
    team varchar(50)
);