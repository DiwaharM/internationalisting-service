var mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
    duration: Number,
    amount: Number,
    grade: Number,
    month: String,
    startingDate: Date,
    closingDate: Date,
    active: Boolean
});
module.exports = PackageSchema;