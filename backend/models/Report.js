const mongoose = require('mongoose');

const ReportSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a report title'],
    },
    type:{
        type: String,
        enum:["techinal","financial","other"],
        required: [true, 'Please provide a report type'],

    },
    status: {
        type: String,
        enum: ['resolved','pending','unseen'],
        required: [true, 'Please provide a report status'],
      },
   createdBy : {
      type: mongoose.Types.ObjectId,
      required: [true, 'Please provide the creator'],
      ref: 'User',
    },
  }
);

module.exports = mongoose.model('Report', ReportSchema);
