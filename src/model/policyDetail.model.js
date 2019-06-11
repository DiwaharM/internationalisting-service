var mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
    policyQuestion: String,
    policyAnswers: String
});
module.exports = PolicySchema;