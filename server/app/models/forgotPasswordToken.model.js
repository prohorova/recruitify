var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var ForgotPasswordTokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 43200
  }
});

var ForgotPasswordToken = mongoose.model('ForgotPasswordToken', ForgotPasswordTokenSchema);

module.exports = ForgotPasswordToken;
