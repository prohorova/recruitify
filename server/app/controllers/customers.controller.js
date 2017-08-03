var nodemailer = require('nodemailer');
var Customer = require('../models/customer.model');

exports.create = function(req, res, next) {
  if (req.body.phone) return res.status(200).send({message: 'No support for sms yet!'});
  Customer.findOne({email: req.body.email, phone: req.body.phone}, function(err, customer) {
    if (err) return next(err);
    if (customer) return res.status(400).send({message: 'Customer was already invited'});
    var newCustomer = new Customer(req.body);
    newCustomer.user = req.decoded._id;
    newCustomer.save(function(err) {
      if (err) return next(err);
      if (newCustomer.email) {
        // send email
        var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
        var mailOptions = { from: 'no-reply@example.com', to: newCustomer.email, subject: 'Invitation to leave a feedback', text: 'Hello,\n\n' + 'Please give us your feedback by clicking the link: \nhttp:\/\/' + req.headers.host + '\/feedback\/' + newCustomer._id + '.\n' };
        transporter.sendMail(mailOptions, function (err) {
          if (err) return res.status(500).send({ msg: err.message });
          return res.status(200).send({message: 'Customer ' + newCustomer.name + ' was invited successfully'});
        });
      } else {
        // send sms
      }
    })
  })
};

exports.get = function(req, res, next) {
  var id = req.params.id;
  Customer.findById(id).populate('user', 'company').exec(function(err, customer) {
    if (err) return next(err);
    if (!customer) return res.status(400).send({message: 'No customer found'});
    if (customer.completed) return res.status(400).send({message: 'Customer already left feedback'});
    return res.send(customer);
  });
};
