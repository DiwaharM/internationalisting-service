var mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    duration: Number,
    amount: Number,
    month: String,
    grade: Number,
    description: String
});
const Payment = mongoose.model('paymentPackage', PaymentSchema);
module.exports = Payment;