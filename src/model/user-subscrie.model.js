var mongoose = require('mongoose');

const SubscribeSchema = new mongoose.Schema({
    firstName: String,
    mobileNumber: String,
    emailId: String
});
const subscribe = mongoose.model('usersubscribe', SubscribeSchema);
module.exports = subscribe;