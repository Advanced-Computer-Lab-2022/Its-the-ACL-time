const User = require('../models/User');

const changePassword = async (req, res) => {
  const { userId } = req.user;
  const { oldPassword, newPassword } = req.body;
  const user = await User.findOne({ _id: userId });

  const isMatch = await user.comparePassword(oldPassword.toString());

  if (!isMatch) throw new UnauthorizedError('Invalid credentials');

  user.password = newPassword;
  await user.save();
  res.status(200).json(user);
};

module.exports = {
  changePassword,
};
