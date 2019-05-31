var FaqDetails = require('./faqDetails.model');
var mongoose = require('mongoose');

const FaqSchema = new mongoose.Schema({
    faqHeading: String,
    faqDetails: [FaqDetails]
});
const FAQ = mongoose.model('faq', FaqSchema);
module.exports = FAQ;