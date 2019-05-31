
var mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    reviewTitle: String,
    reviewDescription: String,
    userName: String,
    date: String,
    listingName: String,
    listingID: String
});
const Review = mongoose.model('review', ReviewSchema);
module.exports = Review;