const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');
const { generateToken } = require('../utils');
const { BadRequestError, UnauthorizedError } = require('../Errors');

const register = async (req, res) => {
  const { username, password, email, type } = req.body;
  if (!username || !password || !email || !type)
    throw new BadRequestError('please provide all values');

  const user = await User.create(req.body);
  const token = generateToken({
    userId: user._id,
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
  });

  user.type = {};
  user.password = '';

  res.status(StatusCodes.OK).json({ user, token });
};

const logout = async (req, res) => {
  console.log('logout');
};

module.exports = {
  register,
  login,
  logout,
};
