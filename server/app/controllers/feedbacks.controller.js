var Customer = require('../models/customer.model');
var Feedback = require('../models/feedback.model');

exports.create = function(req, res, next) {
  Customer.findById(req.body.customerId, function(err, customer) {
    if (err) return next(err);
    if (!customer) return res.status(400).send({message: 'Customer doesn\'t exist'});
    if (customer.completed) return res.status(400).send({message: 'Customer already left feedback'});

    var feedback = new Feedback(req.body);
    feedback.customer = customer._id;
    feedback.user = customer.user;
    feedback.save(function(err) {
      if (err) return next(err);
      customer.completed = true;
      customer.save(function(err) {
        if (err) return next(err);
        return res.send({message: 'We saved your feedback successfully'})
      })
    })
  })
};

exports.list = function(req, res, next) {
  Feedback.find({user: req.decoded._id}).populate('customer', 'name').exec(function(err, feedbacks) {
    if (err) return next(err);
    return res.send(feedbacks);
  })
};
