const epxress = require('express');
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

// Model
const Article = require('./model/Articles');
// Routes
const articleRouter = require('./routes/atricles.routes');

const app = epxress();

app.use(epxress.json());
app.use(epxress.urlencoded({ extended: true }));
app.use(epxress.static(__dirname + '/public'));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// home route
app.get('/', async(req, res) => {
  // const articles = [{
  //   title: 'title',
  //   createdAt: new Date(),
  //   description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora, reiciendis. Itaque alias rem quasi adipisci, nostrum, debitis ab veritatis fuga eius nisi voluptatibus possimus natus voluptatum repudiandae dicta. Explicabo, laudantium.'
  // }]
  const articles = await Article.find({})
  res.render('index', { title: 'My Blog', articles });
})

// routes
app.use('/articles', articleRouter);

// 404 page not found
app.use((req, res) => {
  res.render('404')
})


// mongoose
mongoose
  .connect('mongodb://127.0.0.1:27017/myblog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Connected to Database!');
    app.listen(3000, () => console.log('Server has started on PORT 3000'));
  })
  .catch(err => {
    console.log(err);
  })