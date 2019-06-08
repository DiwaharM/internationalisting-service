var mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
    duration: Number,
    amount: Number,
    grade: Number,
    startingDate: Date,
    closingDate: Date
});
module.exports = PackageSchema;