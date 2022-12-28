const Refund = require('../models/Refund');
const User = require('../models/User');
const Course = require('../models/Course');

const postRefund = async (req, res) => {
  const { refundMoney, courseId } = req.body;
  const { userId } = req.user;

  const user = await User.findById(userId);

  if (!user) {
    console.log('User not found');
    return res.status(404).json({ message: 'User not found' });
  }

  const course = await Course.findById(courseId);

  if (!course) {
    console.log('Course not found');
    return res.status(404).json({ message: 'Course not found' });
  }

  const enrolled = user.courses.find((course) => course._id == courseId);

  // if (!enrolled) {
  //   console.log('You are not enrolled in this course');
  //   return res
  //     .status(404)
  //     .json({ message: 'You are not enrolled in this course' });
  // }

  const refund = await Refund({
    course: courseId,
    user: userId,
    state: 'pending',
    refundMoney,
  });

  const savedRefund = await refund.save();
  res.status(200).json(savedRefund);
};

const getRefunds = async (req, res) => {
  const { myRefunds } = req.query;
  if (myRefunds) {
    const refunds = await Refund.find({ user: req.user.userId })
      .populate('course', 'title')
      .populate('user', 'username');
    return res.status(200).json(refunds);
  }

  const refunds = await Refund.find()
    .populate('course', 'title')
    .populate('user', 'username');
  res.status(200).json(refunds);
};

module.exports = {
  postRefund,
  getRefunds,
};
