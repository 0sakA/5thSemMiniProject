const express = require('express');
const router = express.Router();
const axios = require('axios');
const Politician = require('../models/politician');

// Get all politicians
router.get('/', async (req, res) => {
  try {
    const politicians = await Politician.find();
    res.json(politicians);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a politician's profile and news by ID
router.get('/:id', async (req, res) => {
  try {
    const politician = await Politician.findById(req.params.id);
    res.json(politician);
  } catch (err) {
    res.status(404).json({ message: 'Politician not found' });
  }
});

// Fetch news for a politician and update database
router.get('/:id/news', async (req, res) => {
  try {
    const politician = await Politician.findById(req.params.id);
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: politician.name,
        apiKey: process.env.NEWS_API_KEY
      }
    });

    const news = response.data.articles.map(article => ({
      title: article.title,
      url: article.url,
      votes: 0
    }));

    politician.news = news;
    await politician.save();

    res.json(politician.news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Upvote a news article
router.post('/news/:newsId/upvote', async (req, res) => {
  try {
    const politician = await Politician.findById(req.body.politicianId);
    const newsItem = politician.news.id(req.params.newsId);
    newsItem.votes += 1;

    await politician.save();
    res.json({ success: true, votes: newsItem.votes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Downvote a news article
router.post('/news/:newsId/downvote', async (req, res) => {
  try {
    const politician = await Politician.findById(req.body.politicianId);
    const newsItem = politician.news.id(req.params.newsId);
    newsItem.votes -= 1;

    await politician.save();
    res.json({ success: true, votes: newsItem.votes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
