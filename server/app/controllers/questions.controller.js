var Question = require('../models/question.model');

exports.list = function(req, res, next) {
  Question.find(function(err, questions) {
    if (err) return next(err);
    return res.send(questions);
  })
};
