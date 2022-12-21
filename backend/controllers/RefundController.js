const Refund = require('../models/Refund');
const User = require('../models/User');
const Course = require('../models/Course');

const postRefund = async (req, res) => {
  const { refundMoney, courseId } = req.body;
  const { userId } = req.user;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const course = await Course.findById(courseId);

  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }

  const enrolled = user.courses.find((course) => course._id == courseId);

  if (!enrolled) {
    return res
      .status(404)
      .json({ message: 'You are not enrolled in this course' });
  }

  const refund = await Refund({
    course: courseId,
    user: userId,
    state: false,
    refundMoney,
  });

  const savedRefund = await refund.save();
  res.status(200).json(savedRefund);
};

const getRefunds = async (req, res) => {
  const { type, userId } = req.user;

  if (type !== 'admin') {
    const refunds = await Refund.find({ user: userId });
    res.status(200).json(refunds);
  } else {
    const refunds = await Refund.find();
    res.status(200).json(refunds);
  }
};

module.exports = {
  postRefund,
  getRefunds,
};
