var Customer = require('../models/customer.model');
var Feedback = require('../models/feedback.model');
var ObjectId = require('mongoose').Types.ObjectId;
var _ = require('lodash');
var async = require('async');
var round = require('mongo-round');

exports.getStatistics = function(req, res, next) {
  async.parallel({
    questions: function(callback) {
      Feedback.aggregate([
        {$match: {user: ObjectId(req.decoded._id)}},
        {$unwind: '$questions'},
        {$project: {'question': '$questions.question', 'answer': '$questions.answer'}},
        {$group: {_id: '$question', score: {$avg: '$answer'}}},
        {$project: {score: round('$score', 2)}}
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
