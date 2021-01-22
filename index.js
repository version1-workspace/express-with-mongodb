const epxress = require('express');
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const AppError = require('./util/AppError');
const articleRoute = require('./routes/atricles.routes');

const app = epxress();

app.use(epxress.json());
app.use(epxress.urlencoded({ extended: true }));
app.use(epxress.static(__dirname + '/public'));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// routes
app.use('/articles', articleRoute);

// 404 page not found
app.use((req, res) => {
  res.render('404')
})


// handle error
const handleValidationErr = err => {
  return new AppError(`Validation Failed... ${err.message}`, 400);
}

app.use((err, req, res, next) => {
  if(err.name === 'ValidationError') err = handleValidationErr(err)
  next(err);
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Something went wrong'} = err;
  res.status(status).send(message);
});


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