const Article = require('../model/Articles');

exports.getAllArticles = async(req, res) => {
  const articles = await Article.find({}).sort({ createdAt: 'desc'})
  res.render('articles/index', { title: 'My Daily Notes', articles });
}

exports.createArticleView = (req, res) => {
  res.render('articles/new', { title: 'New Article'})
}

exports.createArticle = async(req, res) => {
  const newArticle = new Article(req.body)
  await newArticle.save()
  res.redirect(`/articles`)
}

exports.showArticle = async(req, res) => {
  const article = await Article.findById(req.params.id)
  if(!article){
    res.redirect('/articles')
  }
  res.render('articles/show', { article })
}

exports.updateArticleView = async(req, res) => {
  const article = await Article.findById(req.params.id)
  res.render('articles/edit', { title: 'Edit Article', article })
}

exports.updateArticle = async(req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
  res.redirect(`/articles/${article.id}`)
}

exports.deleteArticle = async(req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/articles')
}