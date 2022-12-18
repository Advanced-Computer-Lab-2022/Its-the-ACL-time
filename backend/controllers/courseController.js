const { StatusCodes } = require('http-status-codes');
const { Course, User } = require('../models');
const { UnauthorizedError, BadRequestError } = require('../Errors');

const createCourse = async (req, res) => {
  console.log('req.body ' + req.body);
  const {
    title,
    subject,
    price,
    summary,
    previewLink,
    numberOfHours,
    instructorId,
  } = req.body;
  let type = req.user?.type;
  let userId = req.user?.userId;
  if (instructorId) {
    userId = instructorId;
    type = 'Instructor';
  }
  if (type !== 'Instructor')
    throw new UnauthorizedError("you don't have permissions");
  if (
    !title ||
    !subject ||
    !price ||
    !summary ||
    !previewLink ||
    !numberOfHours
  ) {
    throw new BadRequestError('Please provide all course values');
  }
  req.body.createdBy = userId;
  const course = await Course.create(req.body);
  res.status(StatusCodes.CREATED).json({ course });
};

const getCourse = async (req, res) => {
  const { courseId } = req.params;
  let query = Object.keys(req.query)
    .map((key) => (req.query[key] === 'false' ? `-${key}` : key))
    .join(' ');
  console.log('query: ' + query);
  const course = await Course.findOne({ _id: courseId }).select(`${query}`);
  res.status(StatusCodes.OK).json({ course });
};

const getAllCourses = async (req, res) => {
  const { myCourses } = req.query;
  const query = Object.keys(req.query)
    .map((key) => (req.query[key] === 'false' ? `-${key}` : ''))
    .join(' ');

  let courses;
  console.log(query);
  if (myCourses === 'true') {
    const { userId, type } = req.user;
    if (type === 'Instructor') {
      courses = await Course.find({ createdBy: userId }).select(`${query}`);
      return res.status(StatusCodes.OK).json({ courses });
    }
    courses = await User.findOne({ _id: userId });

    // log the fields that are in courses
    console.log(courses.courses);
    console.log(req.query + ' ' + courses);
    return res.status(StatusCodes.OK).json(courses.courses);
  }
  courses = await Course.find({})
    .select(`${query}`)
    .populate('createdBy', 'username');
  return res.status(StatusCodes.OK).json({ courses });
};

const updateCourse = async (req, res) => {
  const { type, userId } = req.user;
  const { courseId } = req.params;

  if (!courseId) throw new BadRequestError('Please provide course id');

  const course = await Course.findOne({ _id: courseId });
  if (!course)
    throw new BadRequestError(`There is no course with this id ${courseId}`);

  const user = await User.findOne({
    _id: userId,
  });

  const isOwner =
    course.createdBy.toString() === userId ||
    user.courses.find((course) => course.courseId === courseId);

  if (!isOwner) {
    throw new UnauthorizedError('You are not the owner of that course');
  }

  const updatedCourse = await Course.findOneAndUpdate(
    { _id: courseId },
    { ...req.body },
    { new: true }
  );

  res.status(StatusCodes.OK).json({ updatedCourse });
};

const getCoursesInstructor = async (req, res) => {
  const instructor = req.params.id;
  const { userId, type } = req.user;
  console.log('get courses Instructor');
  console.log(instructor);
  console.log(userId);
  if (instructor !== userId && type !== 'Instructor') {
    res.status(401).send({ msg: 'you are not authorized to this data' });
  }
  Course.find({ createdBy: instructor }, (err, data) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).send(err);
    } else {
      res.status(StatusCodes.OK).json({ data });
    }
  });
};

const courseEnroll = async (req, res) => {
  const { userId, type } = req.user;
  const { courseId } = req.params;
  const user = await User.findOne({
    _id: userId,
    courses: { $ne: { courseId: courseId, isCompleted: false } },
    courses: { $ne: { courseId: courseId, isCompleted: true } },
  });

  // if (type === 'Instructor') {
  //   throw new UnauthorizedError("Instructor can't enroll in courses");
  // }

  if (!user)
    throw new BadRequestError('You are already enrolled in this course');

  user.courses.push({ courseId: courseId, isCompleted: false });
  await user.save();
  res.status(200).json({ msg: 'You are enrolled in this course' });
};

const getEnrolledCourses = async (req, res) => {
  const userId = req.params.id;
  if (userId !== req.user.userId) {
    res.status(401).json({ msg: 'you are not authorized' });
  }
  const { courses } = req.user;
  let coursesPopulated = courses.populate('courseId');
  res.status(200).json({ courses: coursesPopulated });
};

module.exports = {
  createCourse,
  getCourse,
  getAllCourses,
  updateCourse,
  getCoursesInstructor,
  courseEnroll,
  getEnrolledCourses,
};
