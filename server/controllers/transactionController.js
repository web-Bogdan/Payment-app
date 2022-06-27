const TransactionModel = require("../models/TransactionModel");

module.exports = async (req, res) => {
    try {
        const doc = new TransactionModel({
            cardNumber: req.body.cardNumber,
            expirationDate: req.body.expirationDate,
            cvv: req.body.cvv,
            amount: req.body.amount
        });
        const transaction = await doc.save();
        res.json({RequestId: transaction._id, Amount: transaction.amount})
    } catch (err){
        console.log(err);
        res.status(500).json({
            message: "Ошибка сервера"
        })
    }
};

