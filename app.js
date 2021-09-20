require('dotenv-safe').config();
require('express-async-errors');
const fs = require('fs');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const handleErrors = require('./api/middleware/handleErrors');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Dyanmic Routing
 * Adds all routes from routes folder
 */
fs.readdirSync('./routes').forEach((file) => {
  app.use('/', require('./routes/' + file));
});

app.use(handleErrors);

module.exports = app;
