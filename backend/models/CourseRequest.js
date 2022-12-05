const mongoose = require('mongoose');

const CourseRequestSchema = mongoose.Schema(
  {
   course:{
    type:mongoose.Types.ObjectId,
    required: [true, 'Please provide the creator'],
    ref:"Course"
   },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: [true, 'Please provide the creator'],
      ref: 'User',
    },
    state :{
        type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CourseRequest', CourseRequestSchema);
