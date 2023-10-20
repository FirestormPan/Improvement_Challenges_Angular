var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const mysql = require('mysql');

//step1 orizw ta routers (2 na ta kalesw se auto to arxeio me use)
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var challengesRouter = require('./routes/challenges');

var app = express();

// view engine setup
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
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = 3001; //porta

//# Database Connection!
// // Create a connection to the database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'kalampangalareleme1209',
//   database: "mydb"       
// });

// // open the MySQL connection
// connection.connect(error => {
//   if (error){
//       console.log("A error has been occurred " + "while connecting to database.");       
//       throw error;
//   }
   
//   //If Everything goes correct, Then start Express Server
//   app.listen(PORT, ()=>{
//       console.log("Database connection is Ready and " + "Server is Listening on Port ", PORT);
//   })
// });

app.listen(port, ()=>{
  console.log("ola boba sthn porta:" , port)
})

module.exports = app;
