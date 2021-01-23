const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
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
    required: true
  },
  articleId: {
    type: String,
    default: true
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
