var package = require('./package-details.model');
var cutomerlog = require('./customerLog.model');
var mongoose = require('mongoose');

const BusinessUserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    companyName: String,
    country: String,
    listingState: String,
    emailId: String,
    mobileNumber: String,
    password: String,
    listingCompanyName: String,
    listingCountry: String,
    listingEmailId: String,
    listingMobileNumber: String,   
    addressLine1: String,
    addressLine2: String,
    landMark: String,
    city: String,
    state: String,
    pincode: String,
    weblink: String,
    category: String,
    subCategory: String,
    categoryName: String,
    subCategoryName: String,
    packageDetails: [package],
    logImageName: String,
    companyImageName: [String],
    customerLogs: [cutomerlog],
    activation: Boolean,
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    paymentStatus: String
});
const BusinessAccount = mongoose.model('businessuseraccount', BusinessUserSchema);
module.exports = BusinessAccount;