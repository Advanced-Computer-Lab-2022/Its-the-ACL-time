
const express = require('express');
const router = express.Router();

const {getPaymentSession,addPayment} =  require('../controllers/PaymentController');
const {authOwner} = require('../middlewares');

router.post('/create-checkout-session',authOwner,getPaymentSession);

module.exports = router;

