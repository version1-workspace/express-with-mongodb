const Article = require('../model/Articles');

exports.getAllArticles = async(req, res) => {
  const articles = await Article.find({})
  res.render('articles/index', { title: 'My Blog', articles });
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
  const { id } = req.params
  const article = await Article.findById(id)
  if(!article){
    res.redirect('/')
  }
  res.render('articles/show', { article })
}

exports.updateArticleView = async(req, res) => {
  const { id } = req.params
  const article = await Article.findById(id)
  res.render('articles/edit', { article })
}

exports.updateArticle = async(req, res) => {
  const { id } = req.params
  const article = await Article.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
  res.redirect(`/articles/${article.id}`)
}

exports.deleteArticle = async(req, res) => {
  const { id } = req.params
  await Article.findByIdAndDelete(id)
  res.redirect('/articles')
}