const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VideoNotesSchema = new Schema({
  video: {
    type: Schema.Types.ObjectId,
    required: [true, 'please provide which video'],
    ref: 'Video',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'please provide a user for video'],
  },
  description: {
    type: String,
    required: [true, 'please provide a description for video'],
  },
});

module.exports = mongoose.model('VideoNotesModel', VideoNotesSchema);
