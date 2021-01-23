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
  authorId: {
    type: String,
    required: [true, 'Author is required']
  },
  commentIds: {
    type: [String],
    default: []
  },
  likeIds: {
    type: [String],
    default: []
  }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
