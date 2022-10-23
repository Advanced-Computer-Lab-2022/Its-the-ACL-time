const { StatusCodes } = require('http-status-codes');
const { UnauthorizedError } = require('../Errors');
const { Exercise } = require('../models/Exercise');

const createExercise = async (req, res) => {
  const { type } = req.user;
  if (type !== 'Instructor') {
    throw new UnauthorizedError('You are not allowed to add exercise');
  }
  const { courseId } = req.params;
  const { questions } = req.body;
  const exercise = await Exercise.create({ questions, course: courseId });
  res.status(StatusCodes.CREATED).json({ exercise });
};

const getAllExercises = async (req, res) => {
  const { courseId } = req.params;
  console.log(courseId);
  const exercises = await Exercise.find({ course: courseId });
  res.status(StatusCodes.OK).json({ exercises });
};

const getExercise = async (req, res) => {
  const { exerciseId } = req.params;
  const exercise = await Exercise.findOne({ _id: exerciseId });
  res.status(StatusCodes.OK).json({ exercise });
};

const updateExercise = async (req, res) => {
  const { type } = req.user;
  if (type !== 'Instructor') {
    throw new UnauthorizedError('You are not allowed to add exercise');
  }
  const { exerciseId } = req.params;
  const { questions } = req.body;
  const exercise = await Exercise.findOneAndUpdate(
    { _id: exerciseId },
    { questions },
    { new: true }
  );
  res.status(StatusCodes.OK).json({ exercise });
};

module.exports = {
  getAllExercises,
  getExercise,
  createExercise,
  updateExercise,
};
