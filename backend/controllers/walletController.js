const { Wallet } = require('../models')
const { StatusCodes } = require('http-status-codes');



// allowed for the wallet owner
exports.findWallet = async (req, res) => {
    const id = req.params.id;
    Wallet.findById(id, (err, wallet) => {
        if (err) {
            res.status(StatusCodes.NOT_FOUND).send(err);
        } else {
            res.status(StatusCodes.OK).json({ wallet });
        }
    })
}
// allowed only for admin
exports.addWallet = async (req, res) => {
    const { owner, balance } = req.body;
    Wallet.create({ owner: owner, balance: balance }, (err, wallet) => {
        if (err) {
            res.status(StatusCodes.BAD_REQUEST).send(err);
        } else {
            res.status(StatusCodes.CREATED).json({ wallet });
        }
    })
}

// allowed only for admin
exports.updateWallet = async (req, res) => {
    const { owner, balance } = req.body;
    const id = req.params.id;
    Wallet.findByIdAndUpdate(id, { owner: owner, balance: balance }, (err, wallet) => {
        if (err) {
            res.status(StatusCodes.BAD_REQUEST).send(err);
        } else {
            res.status(StatusCodes.OK).json({ wallet });
        }
    })
}

// allowed only for admin
exports.allWallets = async (req, res) => {
    Wallet.find({}, (err, data) => {
        if (err) {
            res.status(StatusCodes.BAD_REQUEST).send(err);
        } else {
            res.status(StatusCodes.OK).json({ data });
        }
    })
}

// allowed only for admin
exports.deleteWallet = async (req, res) => {
    const id = req.params.id;
    Wallet.findByIdAndDelete(id, (err, wallet) => {
        if (err) {
            res.status(StatusCodes.BAD_REQUEST).send(err);
        } else {
            res.status(StatusCodes.ACCEPTED).json({ wallet });
        }
    })
}
