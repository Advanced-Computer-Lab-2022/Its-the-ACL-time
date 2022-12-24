const express = require('express');
const router = express.Router();
const {
  findWallet,
  addWallet,
  allWallets,
  updateWallet,
  deleteWallet,
} = require('../controllers/walletController');

const {
  changePassword,
  GetBio,
  updateBio,
  updateEmail,
} = require('../controllers/userController');

const {
  findCertification,
  allCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} = require('../controllers/CertificationController');

const {
  updateUserProgress,
  getUser,
  updateUserInfo,
} = require('../controllers/userController');

const { authOwner, authAdmin, authMiddleware } = require('../middlewares');

// wallet router

router.get('/wallet', authAdmin, allWallets);
router.get('/wallet/:id', authOwner, findWallet);
router.post('/wallet/', authAdmin, addWallet);
router.patch('/wallet/:id', authAdmin, updateWallet);
router.delete('/wallet/:id', authAdmin, deleteWallet);

// end wallet router

// certification router

router.get('/certification', authAdmin, allCertifications);
router.get('/certification/:id', authOwner, findCertification);
router.post('/certification', authAdmin, createCertification);
router.patch('/certification/:id', authAdmin, updateCertification);
router.delete('/certification/:id', authAdmin, deleteCertification);
// end certification router
// bltagy edit
router.patch('/restestpassword', changePassword);
router.patch('/updateBio', updateBio);
router.patch('/updateEmail', updateEmail);
router.get('/GetBio', GetBio);
router.patch('/', authMiddleware, updateUserInfo);

// update course progress
router.get('/progress/:id', authMiddleware, getUser);
router.patch('/progress/:id', authMiddleware, updateUserProgress);

module.exports = router;
