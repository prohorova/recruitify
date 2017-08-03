var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  }
});

var Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
