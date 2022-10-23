const {Wallet} = require('../models')

// allowed for the wallet owner
exports.findWallet = (req,res)=>{
    res.send("Get Wallet of User");
}

// allowed only for admin
exports.addWallet = (req,res)=>{
    res.send("add Wallet of User");
}

// allowed only for admin
exports.updateWallet = (req,res)=>{
    res.send("wallet is updated");
}

// allowed only for admin
exports.allWallets = (req,res)=>{
    res.send("all wallet in the system");
}

// allowed only for admin
exports.deleteWallet = (req,res) =>{
    res.send("delete wallet in the system");
}
