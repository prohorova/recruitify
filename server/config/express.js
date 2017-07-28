var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var compress = require('compression');
var expressValidator = require('express-validator');
var config = require('./config.js');

module.exports = function() {
  var app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(expressValidator());

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  require('../app/routes/router.js')(app);

  app.get('/favicon.ico', function(req, res) {
    res.status(204).send();
  });

  app.use(express.static('./dist'));

  app.get('/*', function(req, res) {
    res.sendFile('./dist/index.html');
  });

  return app;
};




