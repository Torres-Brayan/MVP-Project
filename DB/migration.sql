DROP TABLE IF EXISTS favorite_soccer_players;

CREATE TABLE favorite_soccer_players(
    id serial,
    name varchar(50),
    number integer,
    position varchar(50),
    team varchar(50)
);