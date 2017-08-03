var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  text: {
    type: String,
    required: true
  }
});

var Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
