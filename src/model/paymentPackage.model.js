var mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    duration: Number,
    amount: Number,
    grade: Number,
    description: String
});
const Payment = mongoose.model('paymentPackage', PaymentSchema);
module.exports = Payment;