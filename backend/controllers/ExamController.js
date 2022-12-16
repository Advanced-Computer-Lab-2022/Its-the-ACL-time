const Exam = require('../models/Exam');
const User = require('../models/User');
const mongoose = require('mongoose');

// GET a single exercise
const getExam = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return req.status(404).json({ error: 'No such Exam' });
  }

  const exam = await Exam.findById(id).populate('questions');
  if (!exam) {
    return res.status(400).json({ error: 'No such Exam' });
  }
  res.status(200).json(exam);
};

// GET all exams
const getAllExams = async (req, res) => {
  const { courseId } = req.query;
  const exam = await Exam.find({ course: courseId }).select('_id title');
  res.status(200).json(exam);
};

// POST a new Exam

const createExam = async (req, res) => {
  const { userId } = req.user;
  const { course, duration, questions } = req.body;

  if (!course || !duration || !questions) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(400).json({ error: 'No such user' });
  }

  if (user.type !== 'Instructor') {
    return res.status(400).json({ error: 'Only Instructor can create exams' });
  }

  if (user.courses.find((c) => c.courseId == course) === undefined) {
    return res
      .status(400)
      .json({ error: 'Instructor is not assigned to this course' });
  }

  const exam = await Exam.create({ course, duration, questions });
  res.status(200).json(exam);
};

// DELETE an Exam

const deleteExam = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return req.status(404).json({ error: 'No such Exam' });
  }
  const exam = await Exam.findOneAndDelete({ _id: id });
  if (!exam) {
    return res.status(400).json({ error: 'No such Exam' });
  }
  res.status(200).json(exam);
};

// UPDATE an Exam
const updateExam = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return req.status(404).json({ error: 'No such Exam' });
  }
  const exam = await Exam.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!exam) {
    return res.status(400).json({ error: 'No such Exam' });
  }
  res.status(200).json(exam);
};

module.exports = {
  getExam,
  createExam,
  deleteExam,
  updateExam,
  getAllExams,
};
