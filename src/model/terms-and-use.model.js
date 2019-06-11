var mongoose = require('mongoose');

const TermsSchema = new mongoose.Schema({
    heading: String,
    details: String,
    detailsUpdate: Boolean
});
const Terms = mongoose.model('termsanduse', TermsSchema);
module.exports = Terms;