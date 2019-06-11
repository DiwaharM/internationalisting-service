var mongoose = require('mongoose');

const CustomerLogSchema = new mongoose.Schema({
    date: String,
    customerID: mongoose.Schema.ObjectId
});
module.exports = CustomerLogSchema;