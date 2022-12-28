const mongoose = require('mongoose');

const refundSchema = mongoose.Schema({
  course: {
    type: mongoose.Types.ObjectId,
    ref: 'Course',
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  state: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
  },
  refundMoney: {
    type: Number,
  },
});

module.exports = mongoose.model('Refund', refundSchema);
