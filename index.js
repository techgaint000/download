const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const snapsave = require('./snapsave-downloader');
const port = 3000;

const corsMiddleware = (req, res, next) => {
  const allowedOrigin = 'https://instafbreels.vercel.app';
  const requestOrigin = req.headers.origin;

  if (requestOrigin === allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  } else {
    res.status(403).json({ error: 'Auth Failed : Blocked Ip' });
  }
};

// Apply CORS middleware to all routes
app.use(corsMiddleware);

app.get('/', (req, res) => {
  res.json({ message: 'Authentication Failed' });
});

app.get('/igdl', async (req, res) => {
  try {
    const url = req.query.url;

    if (!url) {
      return res.status(400).json({ error: 'Failed to Authenticate' });
    }

    const downloadedURL = await snapsave(url);
    res.json({ url: downloadedURL });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
