var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var TokenSchema = new Schema({
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

var Token = mongoose.model('Token', TokenSchema);

module.exports = Token;
