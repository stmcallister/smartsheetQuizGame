'use strict';

var express = require('express');
var path = require('path');
var homeRoute = require('./routes/index');
var gameRoute = require('./routes/game');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/', homeRoute);

app.use('/game', gameRoute);

app.listen(3000, function() {
  console.log('App running on port 3000!');
});

module.exports = app;
