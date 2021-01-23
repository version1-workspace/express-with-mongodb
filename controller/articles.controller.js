const Article = require('../model/Article');
const User = require('../model/User');
const AppError = require('../util/AppError');

function wrapAsync(fn){
  return function(req, res, next){
    fn(req, res, next).catch(err => next(err))
  }
}

exports.getAllArticles = wrapAsync(async(req, res, next) => {
  const articles = await Article.find({}).sort({ createdAt: 'desc'})
  if(!articles){
    throw new AppError('Articles Not Found', 404)
  }
  res.render('articles/index', { title: 'My Daily Notes', articles });
})

exports.createArticleView = (req, res, next) => {
  res.render('articles/new', { title: 'New Article'})
}

exports.createArticle = wrapAsync(async(req, res, next) => {
  const { author, title, content } = req.body
  const user = new User({ name: author })
  await user.save()

  const newArticle = new Article({ title, content, authorId: user.id })
  await newArticle.save()
  res.redirect(`/articles`)
})

exports.showArticle = wrapAsync(async(req, res, next) => {
  const article = await Article.findById(req.params.id)
  if(!article){
    res.redirect('/articles')
  }
  res.render('articles/show', { article })
})

exports.createComment = wrapAsync(async(req, res, next) => {
  //
})

exports.updateArticleView = wrapAsync(async(req, res, next) => {
  const article = await Article.findById(req.params.id)
  if(!article){
    throw new AppError('Article Not Found', 400)
  }
  res.render('articles/edit', { title: 'Edit Article', article })
})

exports.updateArticle = wrapAsync(async(req, res, next) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
  if(!article){
    throw new AppError('Article Not Found', 400)
  }
  res.redirect(`/articles/${article.id}`)
})

exports.deleteArticle = wrapAsync(async(req, res, next) => {
  const article = await Article.findByIdAndDelete(req.params.id)
  if(!article){
    throw new AppError('Article Not Found', 400)
  }
  res.redirect('/articles')
})
