var User = require('../models/user.model');
var Customer = require('../models/customer.model');
var Feedback = require('../models/feedback.model');
var _ = require('lodash');
var async = require('async');

exports.getStatistics = function(req, res, next) {
  async.parallel({
    questions: function(callback) {
      Feedback.aggregate([
        {$unwind: '$questions'},
        {$project: {'question': '$questions.question', 'answer': '$questions.answer'}},
        {$group: {_id: '$question', score: {$avg: '$answer'}}}
      ], function (err, questions) {
        if (err) return callback(err);
        return callback(null, questions);
      })
    }, customers: function(callback) {
      Customer.find({user: req.decoded._id}, function (err, customers) {
        if (err) return callback(err);
        var invited = customers.length;
        var completed = customers.filter(function (customer) {
          return customer.completed;
        }).length;
        return callback(null, {invited: invited, completed: completed});
      })
    }

  }, function (err, results) {
    if (err) return next(err);
    return res.send(results);
  });
};
