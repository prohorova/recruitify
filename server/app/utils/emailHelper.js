var nodemailer = require('nodemailer');
var _ = require('lodash');

var transporter = nodemailer.createTransport(
  {
    service: 'Sendgrid',
    auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD
    }
  }
);

// var mailOptions = {
//   from: 'no-reply@example.com',
//   to: newCustomer.email,
//   subject: 'Invitation to leave a feedback',
//   text: 'Hello,\n\n' + 'Please give us your feedback by clicking the link \n '+req.protocol+':\/\/' + req.headers.host + '\/feedback\/' + newCustomer._id + '.\n'
// };

exports.sendEmail = function(mailOptions, callback) {
  _.extend(mailOptions, {from: 'no-reply@example.com'});
  transporter.sendMail(mailOptions, function (err) {
    callback(err);
  });
};


