const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  updateUser,
} = require('../controllers/authController');
const { authMiddleware } = require('../middlewares');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/update').patch(authMiddleware, updateUser);

module.exports = router;
