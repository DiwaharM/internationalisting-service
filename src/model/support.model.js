var mongoose = require('mongoose');

const SupportSchema = new mongoose.Schema({
    whatsappNumber: String,
    emailId: String,
    openTimings: String
});
const support = mongoose.model('supports', SupportSchema);
module.exports = support;