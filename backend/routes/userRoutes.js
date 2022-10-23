const express = require("express");
const router = express.Router();
const{findWallet,addWallet,allWallets,updateWallet,deleteWallet} = require('../controllers/walletController');
const{authOwner,authAdmin,authMiddleware} = require('../middlewares')

// wallet router

router.get('/wallet',authAdmin,allWallets);
router.get('/wallet/:id',authOwner,findWallet);
router.post('/wallet/',authAdmin,addWallet);
router.patch('/wallet/:id',authAdmin,updateWallet);
router.delete('/wallet/:id',authAdmin,deleteWallet);

// end wallet router

module.exports = router;