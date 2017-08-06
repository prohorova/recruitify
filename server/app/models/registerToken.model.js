var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var RegisterTokenSchema = new Schema({
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

var RegisterToken = mongoose.model('RegisterToken', RegisterTokenSchema);

module.exports = RegisterToken;
