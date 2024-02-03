const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    sender: { type: String, required: true},
    receiver: { type: String, required: true},
    amount: { type: Number, required: true},
    sender_balance: { type: Number, required: true},
    receiver_balance: { type: Number, required: true},
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);