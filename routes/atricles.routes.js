const express = require('express');
const router = express.Router();
const articleController = require('../controller/articles.controller');

// index
router.get('/', articleController.getAllArticles)
// router.get('/', articleController.index)

// New
router.get('/new', articleController.createArticleView)
// router.get('/', articleController.new)

// Create
router.post('/', articleController.createArticle)
// router.post('/', articleController.create)

// Show
router.get('/:id', articleController.showArticle)
// router.get('/:id', articleController.show)

// Edit
router.get('/:id/edit', articleController.updateArticleView)
// router.get('/:id/edit', articleController.edit)

// Update
router.put('/:id', articleController.updateArticle)
// router.put('/:id', articleController.update)

// Delete
router.delete('/:id', articleController.deleteArticle)
// router.delete('/:id', articleController.delete)


module.exports = router;
