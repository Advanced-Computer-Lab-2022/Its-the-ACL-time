const { StatusCodes } = require('http-status-codes');
const { UnauthorizedError } = require('../Errors');
const { Course } = require('../models');
const SubTitle = require('../models/SubTitle');

const createSubTitle = async (req, res) => {
  // const { type, userId } = req.user;

  // if (type !== 'Instructor') {
  //   throw new UnauthorizedError('You are not allowed to add subtitle');
  // }

  // const course = await Course.findOne({ _id: courseId });

  // if (course.createdBy.toString() !== userId.toString()) {
  //   throw new UnauthorizedError('You are not allowed to add subtitle');
  //}
  const { courseId } = req.params;

  const subTitles = req.body;

  subTitles.map(async (item) => {
    const { title, link, duration, description } = item;
    const newSubtitle = new SubTitle({
      title,
      link,
      duration,
      description,
      course: courseId,
    });
    await newSubtitle.save();
  });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: 'Subtitles created successfully' });
};

const getAllSubTitles = async (req, res) => {
  const { courseId } = req.params;
  const subTitles = await SubTitle.find({ course: courseId });
  res.status(StatusCodes.OK).json({ subTitles });
};

const getSubTitle = async (req, res) => {
  const { subtitleId } = req.params;
  const subTitle = await SubTitle.find({ _id: subtitleId });
  res.status(StatusCodes.OK).json({ subTitle });
};

const updateSubTitle = async (req, res) => {
  const { type } = req.user;
  if (type !== 'Instructor') {
    throw new UnauthorizedError('You are not allowed to add exercise');
  }
  const { subTitle } = req.body;
  const { subtitleId } = req.params;
  const newSubtitle = await SubTitle.findOneAndUpdate(
    { _id: subtitleId },
    { ...subTitle },
    { new: true }
  );
  res.status(StatusCodes.OK).json({ newSubtitle });
};

module.exports = {
  updateSubTitle,
  getSubTitle,
  getAllSubTitles,
  createSubTitle,
};
