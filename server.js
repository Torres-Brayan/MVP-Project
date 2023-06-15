const express = require('express');
const dotenv = require('dotenv');
const { Pool } = require('pg');

const app = express();

const pool = new Pool ({
    connectionString: process.env.DATABASE_URL
});

dotenv.config();

app.use(express.json());

app.use(express.static('public'));

app.get('/favorite/players', async (req, res) => {
    try {
        const result = await pool.query('SELECT name, number, position, team FROM favorite_soccer_players ');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on PORT: ${process.env.PORT}`)
});