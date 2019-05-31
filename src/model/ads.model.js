var mongoose = require('mongoose');

const ADSchema = new mongoose.Schema({
    position: String,
    adsImageName: String,
    adsDescription: String
});
const ADs = mongoose.model('ads', ADSchema);
module.exports = ADs;