const { default: mongoose } = require("mongoose");


const Schema = mongoose.Schema


const WalletSchema = new Schema({
    owner: { 
        type: Schema.Types.ObjectId, 
        ref: "User" ,
        required:[true,"please provide an owner of the wallet"]
    },
    balance: { 
        type: Number, 
        min: [0,"min balance for wallet is zero"], 
        required: false,
        default:0
    },
}
)

module.exports = mongoose.model("Wallet", WalletSchema) 
