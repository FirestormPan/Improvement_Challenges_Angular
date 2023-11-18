var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

//step1 orizw ta routers (2 na ta kalesw se auto to arxeio me use)
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRouter');
var challengesRouter = require('./routes/challengesRouter');

const app = express();

// view engine setup (irrelevant)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin:"*" //ta url pou dexomai na kanoune aithmata ( https // url // :port)
}))

//step2 kalw ta routers (step 3 na ta ftia3w sto routes folder)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/challenges', challengesRouter);
// catch 404 and forward to error handler (if none of the above  were true!)
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send(err.message)
});



module.exports = app;
