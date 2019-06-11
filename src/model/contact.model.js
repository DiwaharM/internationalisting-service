var mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    phoneNumber: String,
    emailId: String,
    address: String
});
const contact = mongoose.model('contacts', ContactSchema);
module.exports = contact;