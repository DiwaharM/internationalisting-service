var mongoose = require('mongoose');

const FaqSchema = new mongoose.Schema({
    faqQuestion: String,
    faqAnswers: String
});
module.exports = FaqSchema;