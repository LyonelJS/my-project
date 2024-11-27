// backend.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

const API_KEY = 'AIzaSyBAzKJLyNO5Fbu86aMt2MbYOHNZWZQXbIk';
const API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateMessage';

app.use(express.json());

app.post('/api/generate', async (req, res) => {
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
