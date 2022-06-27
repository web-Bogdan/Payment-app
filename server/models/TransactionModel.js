const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
    cardNumber: {
        type: String,
        required: true
    },
    expirationDate: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
