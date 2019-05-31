var mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
    duration: String,
    amount: String,
    grade: String
});
module.exports = PackageSchema;