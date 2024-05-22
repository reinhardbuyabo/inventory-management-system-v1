// server.js
require('dotenv').config()
const cors = require("cors");
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

console.log(process.env.DB_PORT);
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'inventory_management',
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

app.get('/shoes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Shoe');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.post('/shoes', async (req, res) => {
    const { shoe_name, shoe_color } = req.body;
    try {
        const result = await pool.query('INSERT INTO Shoe (shoe_name, shoe_color) VALUES ($1, $2) RETURNING *', [shoe_name, shoe_color]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
