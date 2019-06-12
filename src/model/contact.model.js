var mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    mobileNumber: String,
    emailId: String,
    description: String,
    firstName: String,
    lastName: String
});
const contact = mongoose.model('contacts', ContactSchema);
module.exports = contact;