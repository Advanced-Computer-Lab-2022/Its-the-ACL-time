const { StatusCodes } = require('http-status-codes');
const { UnauthorizedError } = require('../Errors');
const SubTitle = require('../models/SubTitle');

const createSubTitle = async (req, res) => {
  const { type } = req.user;
  if (type !== 'Instructor') {
    throw new UnauthorizedError('You are not allowed to add subtitle');
  }
  const { courseId } = req.params;
  const { subTitle } = req.body;
  subTitle.course = courseId;
  let newSubTitle = await SubTitle.create({ ...subTitle });
  res.status(StatusCodes.CREATED).json({ newSubTitle });
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
