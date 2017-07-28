require('dotenv').config();

var mongoose = require('./config/mongoose.js');
var express = require('./config/express.js');

var db = mongoose();
var app = express();

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Server listening on port ' + port);
});
