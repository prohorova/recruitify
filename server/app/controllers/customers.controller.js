var emailHelper = require('../utils/emailHelper');
var smsHelper = require('../utils/smsHelper');
var Customer = require('../models/customer.model');
var async = require('async');

exports.get = function(req, res, next) {
  var id = req.params.id;
  Customer.findById(id).populate('user', 'companyName').exec(function(err, customer) {
    if (err) return next(err);
    if (!customer) return res.status(400).send({message: 'No customer found'});
    if (customer.completed) return res.status(400).send({message: 'Customer already left feedback'});
    return res.send(customer);
  });
};

exports.list = function(req, res, next) {
  Customer.find().sort('-completed').exec(function(err, customers) {
    if (err) return next(err);
    return res.send(customers);
  })
};

exports.create = function(req, res, next) {
  var data = req.body;
  var userId = req.decoded._id;
  var protocol = req.protocol;
  var host = req.headers.host;
  if (Array.isArray(req.body)) {
    async.each(data, createCustomer.bind(null, userId, protocol, host), function(err) {
      if (err) return next(err);
      return res.send({message: 'Customers were invited'});
    })
  } else {
    createCustomer(userId, protocol, host, data, function(err, successMessage, errorMessage) {
      if (err) return next(err);
      if (successMessage) return res.send({message: successMessage});
      if (errorMessage) return res.status(400).send({message: errorMessage});
    });
  }
};

function createCustomer(userId, protocol, host, data, callback) {
  Customer.findOne({email: data.email, phone: data.phone}, function(err, customer) {

    if (err) return callback(err);
    if (customer) return callback(null, null, 'Customer was already invited');

    var newCustomer = new Customer(data);
    newCustomer.user = userId;

    if (newCustomer.email) {
      var mailOptions = { to: newCustomer.email, subject: 'Invitation to leave a feedback', text: 'Hello,\n\n' +
      'Please give us your feedback by clicking the link \n ' + protocol + ':\/\/' + host + '\/feedback\/' + newCustomer._id + '.\n' };
      emailHelper.sendEmail(mailOptions, function(err) {
        if (err) return callback(err);
        newCustomer.save(function(err) {
          if (err) return callback(err);
          return callback(null, 'Customer ' + newCustomer.name + ' was invited successfully');
        })
      });
    } else {
      var smsOptions = {
        to: newCustomer.phone,
        body: 'Hello,\n\n' + 'Please give us your feedback by clicking the link ' + protocol + ':\/\/' +
        host + '\/feedback\/' + newCustomer._id
      };
      smsHelper.sendSms(smsOptions, function(err) {
        if(err) return callback(err);
        newCustomer.save(function(err) {
          if (err) return callback(err);
          return callback(null, 'Customer ' + newCustomer.name + ' was invited successfully');
        })
      });
    }
  })
}




