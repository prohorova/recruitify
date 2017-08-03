var Question = require('../models/question.model');

exports.getQuestions = function(req, res, next) {
  Question.find(function(err, questions) {
    if (err) return next(err);
    return res.send(questions);
  })
};
