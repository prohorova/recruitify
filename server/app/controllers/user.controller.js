var User = require('../models/user.model');
var Customer = require('../models/customer.model');
var _ = require('lodash');

exports.getStatistics = function(req, res, next) {
  User.findById(req.decoded._id, function(err, user) {
    if (err) return next(err);
    if (!user) return res.status(400).send({message: 'No user found'});
    Customer.find({user: user}, function(err, customers) {
      var invited = customers.length;
      var completed = customers.filter(function(customer) {
        return customer.completed;
      }).length;
      return res.send({invited: invited, completed: completed});
    })
  })
};
