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
  findCertification,
  allCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} = require('../controllers/CertificationController');

const  {
  findVideoNotes,
  addVideoNotes,
  updateVideoNotes,
  allVideoNotes,
  deleteVideoNotes,
} = require('../controllers/VideoNotesController')

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

// video notes router

router.get('/videoNotesAll', allVideoNotes);
router.get('/videoNote/', findVideoNotes);
router.post('/videoNote/', addVideoNotes);
router.patch('/videoNote/:id', updateVideoNotes);
router.delete('/videoNote/:id', deleteVideoNotes);

// end video notes router
module.exports = router;
