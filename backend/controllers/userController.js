const User = require('../models/User');

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

const updateUserProgress = async (req, res) => {
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

const updateUserInfo = async (req, res) => {
  const { userId } = req.user;
  const {
    instructorId,
    username,
    oldPassword,
    newPassword,
    email,
    biography,
    country,
    rating,
  } = req.body;

  const user = await User.findOne({ _id: userId });

  if (!user) throw new UnauthorizedError('Invalid credentials');
  if (username) user.username = username;
  if (email) user.email = email;
  if (biography) user.biography = biography;
  if (country) user.country = country;
  if (oldPassword && newPassword) {
    const isMatch = await user.comparePassword(oldPassword.toString());
    if (!isMatch) throw new UnauthorizedError('Invalid credentials');
    user.password = newPassword;
  }

  let instructor;
  if (rating && instructorId) {
    instructor = await User.findOne({ _id: instructorId });
    instructor.ratings.push(rating);
    const sum = instructor.ratings.reduce((a, b) => a + b, 0);
    const avg = sum / instructor.ratings.length || 0;
    instructor.averageRating = avg;
  }

  if (instructorId) {
    await instructor.save();
  } else {
    await user.save();
  }
  res.status(200).json(instructor ? instructor : user);
};

const getUserInfo = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOne({
    _id: userId,
  });
  res.status(200).json(user);
};

const getUser = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  if (id) {
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

module.exports = {
  changePassword,
  GetBio,
  updateBio,
  updateEmail,
  updateUserProgress,
  getUser,
  updateUserInfo,
  getUserInfo,
};
