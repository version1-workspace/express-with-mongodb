const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // author: {
  //   type: String,
  //   required: [true, 'Author is required']
  // },
  // comments: {
  //   type: String,
  //   default: []
  // }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;