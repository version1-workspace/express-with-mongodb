const express = require('express');
const router = express.Router();
const articleController = require('../controller/articles.controller');

// index
router.get('/', articleController.getAllArticles)

// New
router.get('/new', articleController.createArticleView)

// Create
router.post('/', articleController.createArticle)

// Show
router.get('/:id', articleController.showArticle)

// Edit
router.get('/:id/edit', articleController.updateArticleView)

// Update
router.put('/:id', articleController.updateArticle)

// Delete
router.delete('/:id', articleController.deleteArticle)


module.exports = router;