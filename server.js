const express = require('express');
const pool = require('./database');
const app = express();

app.use(express.json());

app.get('/ping', (req, res) => {
  res.json({ message: "pong", instance: require('os').hostname() });
});

// NEW ROUTE
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;

    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(3000, '0.0.0.0', () => {
  console.log("Server running on port 3000");
});