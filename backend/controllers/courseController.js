const { StatusCodes } = require('http-status-codes');
const { Course, User } = require('../models');
const { UnauthorizedError, BadRequestError } = require('../Errors');

const createCourse = async (req, res) => {
  console.log('req.body ' + req.body);
  const { title, subject, price, summary, previewLink, numberOfHours,instructorId } = req.body;
  let type = req.user?.type;
  let userId = req.user?.userId;
  if(instructorId) {
    userId = instructorId;
    type = "Instructor";
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
  const query = Object.keys(req.query)
    .map((key) => (req.query[key] === 'false' ? `-${key}` : ''))
    .join(' ');
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
    courses = await User.findOne({ _id: userId })
      .select('courses')
      .populate('courses', `${query}`);

    return res.status(StatusCodes.OK).json(courses);
  }
  courses = await Course.find({})
    .select(`${query}`)
    .populate('createdBy', 'username');
  return res.status(StatusCodes.OK).json({ courses });
};

const updateCourse = async (req, res) => {
  const { type, userId } = req.user;
  const { courseId } = req.params;
  console.log(req.body);
  if (!courseId) throw new BadRequestError('Please provide course id');

  if (type !== 'Instructor')
    throw new UnauthorizedError('you are not allowed to update course');

  const course = await Course.findOne({ _id: courseId });
  if (!course)
    throw new BadRequestError(`There is no course with this id ${courseId}`);

  if (userId !== course.createdBy.toString())
    throw new UnauthorizedError('You are not the owner of that course');

  const updatedCourse = await Course.findOneAndUpdate(
    { _id: courseId },
    { ...req.body },
    { new: true }
  );
  res.status(StatusCodes.OK).json({ updatedCourse });
};


const getCoursesInstructor = async (req,res) =>{
  const instructor = req.params.id;
  Course.find({createdBy:instructor},(err,data)=>{
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).send(err);
    } else {
      res.status(StatusCodes.OK).json({ data });
    }
  });
} 

module.exports = {
  createCourse,
  getCourse,
  getAllCourses,
  updateCourse,
  getCoursesInstructor
};
