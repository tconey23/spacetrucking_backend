const express = require('express');
const app = express();

const { Pool } = require('pg');

// Use the DATABASE_URL environment variable for the connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,  // This is often required for Heroku connections
    },
});

// Example query to ensure the connection works
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error executing query', err.stack);
    } else {
        console.log('Database connected successfully:', res.rows);
    }
});

// Middleware to parse JSON bodies
app.use(express.json());

// POST endpoint to store cargo data
app.post('/api/cargo', async (req, res) => {
    const { station, scu, comm } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO cargo (station, scu, comm) VALUES ($1, $2, $3) RETURNING *',
            [station, scu, comm]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// GET endpoint to retrieve stored cargo data
app.get('/api/cargo', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cargo');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Server setup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
