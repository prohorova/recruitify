var User = require('../models/user.model');
var Customer = require('../models/customer.model');
var _ = require('lodash');

exports.getStatistics = function(req, res, next) {
  Customer.find({user: req.decoded._id}, function(err, customers) {
    var invited = customers.length;
    var completed = customers.filter(function(customer) {
      return customer.completed;
    }).length;
    return res.send({invited: invited, completed: completed});
  })
};
