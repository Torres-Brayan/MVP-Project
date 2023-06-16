const express = require("express");
const dotenv = require("dotenv");
const { Pool } = require("pg");
const cors = require('cors');

const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
// const pool = new Pool({
//   user: "brayantorres",
//   host: "localhost",
//   port: 5432,
//   database: "favorite_player",
// });

dotenv.config();

app.use(cors());

app.use(express.json());

app.use(express.static("public"));

app.get("/favorite/players", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT name, number, position, team FROM favorite_soccer_players "
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/favorite/players/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT name, number, position, team FROM favorite_soccer_players WHERE id = $1",
      [id]
    );
    if (!result.rows[0]) {
      return res.status(404).send("No favorite player at given ID.");
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/favorite/players", async (req, res) => {
  try {
    const { name, number, position, team } = req.body;
    if (!name || !number || !position || !team) {
      return res
        .status(400)
        .send("Check body for name, number, position, team.");
    }
    const result = await pool.query(
      "INSERT INTO favorite_soccer_players (name, number, position, team) VALUES ($1, $2, $3, $4) RETURNING name, number, position, team",
      [name, number, position, team]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/favorite/players/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, number, position, team } = req.body;
    if (!name || !number || !position || !team) {
      return res
        .status(400)
        .send("Check body for name, number, position, team.");
    }
    const result = await pool.query(
      "UPDATE favorite_soccer_players SET name = $1, number = $2, position= $3, team = $4 WHERE id = $5 RETURNING name, number, position, team",
      [name, number, position, team, id]
    );
    if (!result.rows[0]) {
      return res.send(404).send("No favorite player at given ID.");
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/favorite/players/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM favorite_soccer_players WHERE id = $1 RETURNING name, number, position, team",
      [id]
    );
    if (!result.rows[0]) {
      return res.status(404).send("No favorite player at given ID.");
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT: ${process.env.PORT}`);
});
