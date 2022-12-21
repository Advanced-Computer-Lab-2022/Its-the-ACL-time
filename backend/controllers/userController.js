const User = require('../models/User');
const {Report}=require('../models');

const changePassword = async (req, res) => {
  const { userId } = req.user;
  console.log(userId);
  const { oldPassword, newPassword } = req.body;
  const user = await User.findOne({ _id: userId });

  const isMatch = await user.comparePassword(oldPassword.toString());

  if (!isMatch) throw new UnauthorizedError('Invalid credentials');

  user.password = newPassword;
  await user.save();
  res.status(200).json(user);
};
const GetBio = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findOne({ _id: userId });
  // await user.save();
  res.status(200).json(user.biography);
};
const updateBio = async (req, res) => {
  const { Bio } = req.body;
  const { userId } = req.user;
  const user = await User.findOne({ _id: userId });
  user.biography = Bio;
  await user.save();
  res.status(200).json(user);
};
const updateEmail = async (req, res) => {
  const { Email } = req.body;
  const { userId } = req.user;
  console.log(Email);
  const user = await User.findOne({ _id: userId });
  user.email = Email;
  await user.save();
  res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const { userId } = req.user;
  const { completedSubtitles, completedExams, progress } = req.body;
  const user = await User.findOne({
    _id: userId,
  });

  const course = user.courses.find(
    (course) => course.courseId.toString() === req.params.id
  );
  console.log(completedSubtitles);
  if (completedExams) course.completedExams = completedExams;
  if (completedSubtitles) course.completedSubtitles = completedSubtitles;
  if (progress) course.progress = progress;

  console.log(course);
  await user.save();
  res.status(200).json({
    message: 'course progress updated successfully',
  });
};

const getUser = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  if (id) {
    // get the course progress of a specific user in a specific course
    const user = await User.findOne({
      _id: userId,
    });

    const courseProgress = user.courses.find(
      (course) => course.courseId.toString() === id
    );
    console.log(courseProgress);
    res.status(200).json(courseProgress);
    return;
  }
};
// create problem 
const createreport = async (req, res) => {
  const { title, type,course} = req.body;
  console.log(req.body)
  const { userId } = req.user;
  console.log(req.user)
  // console.log('req.body ' + username,email,password,type);
   if (
     !title ||
     !type 
     
   ) {
     throw new BadRequestError('Please provide all report values');
   }
   //req.body.createdBy = userId;
 
   const report = await Report.create({
    course: course,
    title,
    status:"unseen",
    type,
    createdBy:userId
  });
  res.status(200).json({ report });
};
///get specific report
const getreport = async (req, res) => {
  const { course} = req.query.id;
  const { userId } = req.user;
  console.log(req.body,req.query.id)
  // console.log('req.body ' + username,email,password,type);

   //req.body.createdBy = userId;
 
  const report=await Report.find({
    createdBy:userId,
    course:req.query.id
  })
  res.status(200).json(report);
};


module.exports = {
  changePassword,
  GetBio,
  updateBio,
  updateEmail,
  updateUser,
  getUser,
  createreport,
  getreport,
};
