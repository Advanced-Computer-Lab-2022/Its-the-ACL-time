const { default: mongoose } = require("mongoose");


const Schema = mongoose.Schema


const WalletSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number, min: 0, required: false },
}
)

module.exports = mongoose.model("Wallet", WalletSchema) 
