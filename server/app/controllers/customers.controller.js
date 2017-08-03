var nodemailer = require('nodemailer');
var twilioClient = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
var Customer = require('../models/customer.model');

exports.create = function(req, res, next) {
  Customer.findOne({email: req.body.email, phone: req.body.phone}, function(err, customer) {

    if (err) return next(err);
    if (customer) return res.status(400).send({message: 'Customer was already invited'});

    var newCustomer = new Customer(req.body);
    newCustomer.user = req.decoded._id;

    if (newCustomer.email) {
      //send email
      var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
      var mailOptions = { from: 'no-reply@example.com', to: newCustomer.email, subject: 'Invitation to leave a feedback', text: 'Hello,\n\n' + 'Please give us your feedback by clicking the link \n '+req.protocol+':\/\/' + req.headers.host + '\/feedback\/' + newCustomer._id + '.\n' };
      transporter.sendMail(mailOptions, function (err) {
        if (err) return res.status(500).send({ msg: err.message });
        newCustomer.save(function(err) {
          if (err) return next(err);
          return res.status(200).send({message: 'Customer ' + newCustomer.name + ' was invited successfully'});
        })
      });
    } else {
      // send sms
      twilioClient.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: newCustomer.phone,
        body: 'Hello,\n\n' + 'Please give us your feedback by clicking the link '+req.protocol+':\/\/' + req.headers.host + '\/feedback\/' + newCustomer._id
      }, function(err) {
        if(err) return res.status(500).send({message: err.message});
        newCustomer.save(function(err) {
          if (err) return next(err);
          return res.send({message: 'Customer ' + newCustomer.name + ' was invited successfully'});
        })
      });
    }
  })
};

exports.get = function(req, res, next) {
  var id = req.params.id;
  Customer.findById(id).populate('user', 'companyName').exec(function(err, customer) {
    if (err) return next(err);
    if (!customer) return res.status(400).send({message: 'No customer found'});
    if (customer.completed) return res.status(400).send({message: 'Customer already left feedback'});
    return res.send(customer);
  });
};




