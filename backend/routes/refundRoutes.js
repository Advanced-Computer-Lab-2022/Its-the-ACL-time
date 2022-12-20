const express = require('express');
const router = express.Router();

const { getRefunds, postRefund } = require('../controllers/RefundController');
const { authAdmin, authMiddleware } = require('../middlewares/auth');

router.post('/', authMiddleware, postRefund);
router.get('/', authAdmin, getRefunds);

module.exports = router;
