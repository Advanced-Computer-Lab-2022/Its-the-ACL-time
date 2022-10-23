const mongoose = require('mongoose');

const ExerciseSchema = mongoose.Schema({
  questions: [
    {
      question: { type: String },
      choices: [
        {
          choice: { type: String },
          isCorrect: { type: Boolean },
        },
      ],
    },
  ],
  course: {
    type: mongoose.Types.ObjectId,
    ref: 'Course',
  },
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = {
  Exercise,
};

