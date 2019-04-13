//Schema for Stock transactions
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Transaction = new Schema({
    user: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    shares: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Transaction", Transaction);