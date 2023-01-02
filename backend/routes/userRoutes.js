const express = require('express');
const router = express.Router();
const {
  findWallet,
  addWallet,
  allWallets,
  updateWallet,
  deleteWallet,
  findEarnings,
} = require('../controllers/walletController');

const {
  changePassword,
  GetBio,
  updateBio,
  updateEmail,
  createreport,
  getreport,
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
  getUserInfo,
} = require('../controllers/userController');

const { authOwner, authAdmin, authMiddleware } = require('../middlewares');

// wallet router

router.get('/earning', authMiddleware, findEarnings);
router.get('/wallet',authMiddleware , allWallets);
router.get('/wallet/:id', authMiddleware , findWallet);
router.post('/wallet/',authMiddleware , addWallet);
router.patch('/wallet/:id', authMiddleware, updateWallet);
router.delete('/wallet/:id', authMiddleware , deleteWallet);

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
router.post('/reportproblem', createreport);
router.get('/getrport', getreport);

router.post('/courserequest', updateEmail);





router.get('/GetBio', GetBio);
router.patch('/', authMiddleware, updateUserInfo);
router.get('/:userId', authMiddleware, getUserInfo);

// update course progress
router.get('/progress/:id', authMiddleware, getUser);
router.patch('/progress/:id', authMiddleware, updateUserProgress);

module.exports = router;
