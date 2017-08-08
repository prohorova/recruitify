var twilioClient = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
var _ = require('lodash');

exports.sendSms = function(smsOptions, callback) {
  _.extend(smsOptions, {from: process.env.TWILIO_PHONE_NUMBER});
  twilioClient.messages.create(smsOptions, function(err) {
    callback(err);
  });
};
