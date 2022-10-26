const { User } = require('../models');
const { StatusCodes } = require('http-status-codes');
const { generateToken } = require('../utils');
const { BadRequestError, UnauthorizedError } = require('../Errors');

const register = async (req, res) => {
  const { username, password, email, type } = req.body;
  console.log(type);
  if (!username || !password || !email || !type)
    throw new BadRequestError('please provide all values');
  console.log(req.body);
  const user = await User.create(req.body);
  const token = generateToken({
    userId: user._id,
    type,
  });
  user.password = '';
  res.status(StatusCodes.CREATED).json({ user, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new BadRequestError('please provide all values');

  const user = await User.findOne({ email });

  if (!user) throw new UnauthorizedError('Invalid credentials');

  const isMatch = await user.comparePassword(password.toString());

  if (!isMatch) throw new UnauthorizedError('Invalid credentials');

  const token = await generateToken({
    userId: user._id,
    type: user.type,
  });

  user.type = {};
  user.password = '';

  res.status(StatusCodes.OK).json({ user, token });
};

const logout = async (req, res) => {
  console.log('logout');
};

// for instructors only (email, biography)

const updateUser = async (req, res) => {
  const { email, biography } = req.body;
  const { userId, type } = req.user;

  if (!email && !biography) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Please provide email or biography or both ' });
  }

  if (type !== 'Instructor')
    throw new UnauthorizedError(
      'You are not allowed to change email or biography'
    );

  // update user with biography if it exists and the email if it exists and return the new user

  const user = await User.findOneAndUpdate(
    { _id: userId },
    { biography: biography || '', email: email || user.email },
    { new: true }
  );

  res.status(StatusCodes.OK).json({ user });
};

module.exports = {
  register,
  login,
  logout,
  updateUser,
};
