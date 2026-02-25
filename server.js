const express = require('express');

const app = express();
const PORT = 3000;

// Simple GET route
app.get('/ping', (req, res) => {
  res.json({
    message: "pong",
    instance: require('os').hostname()
  });
});

app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});