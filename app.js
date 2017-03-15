const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

const local = 'localhost:3000/'
const production = 'howaboutlunch.firebaseapp.com/'


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, local)));

app.use('/api/v1', index);
app.use('/api/v1', users);

app.use('*', function (req, res) {
  res.sendFile('index.html', {
    root: path.join(__dirname, 'howaboutlunch/')
  })
})


app.use(function(err, req, res, next) {
  const response = { message: err.message }
  if (req.app.get('env') === 'development') {
    response.stack = err.stack
  }

  res.status(err.status || 500).json(response);
});

module.exports = app;
