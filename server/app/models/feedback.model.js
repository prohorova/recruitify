var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer'
  },
  questions: [
    {
      question: {
        type: String,
        required: true
      },
      answer: {
        type: String,
        required: true
      }
    }
  ]
});

var Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;
