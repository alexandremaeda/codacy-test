require('dotenv-safe').config();
require('express-async-errors');

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const handleErrors = require('./api/middleware/handleErrors');
const routes = require('./routes');
const cors = require('./api/middleware/cors');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors);
app.use(routes);
app.use(handleErrors);

module.exports = app;
