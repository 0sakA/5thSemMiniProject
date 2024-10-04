const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: String,
  url: String,
  votes: { type: Number, default: 0 }
});

const politicianSchema = new mongoose.Schema({
  name: String,
  bio: String,
  news: [newsSchema]
});

module.exports = mongoose.model('Politician', politicianSchema);
