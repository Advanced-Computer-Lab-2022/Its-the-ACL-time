const express = require("express");
const router = express.Router();
const{findWallet,addWallet,allWallets,updateWallet,deleteWallet} = require('../controllers/wallet');
const{authOwner,authAdmin,authMiddleware} = require('../middlewares')

// wallet router

router.get('/wallet',authMiddleware,authAdmin,allWallets);
router.get('/wallet/:id',authMiddleware,authOwner,findWallet);
router.post('/wallet/:id',authMiddleware,authAdmin,addWallet);
router.patch('/wallet/:id',authMiddleware,authAdmin,updateWallet);
router.delete('/wallet/:id',authMiddleware,authAdmin,deleteWallet);

// end wallet router

module.exports = router;