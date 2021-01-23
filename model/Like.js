const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  doerId: {
    type: String,
    required: true
  },
  articleId: {
    type: String,
    required: true
  },
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
