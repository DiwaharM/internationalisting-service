var listingDA = require('./listingDA');

exports.getListingByCategory = function (req, res) {
    try {
        listingDA.getListingByCategory(req, res);
    } catch (error) {
        console.log(error);
    }
}

exports.getSelectedListingByCategory = function (req, res) {
    try {
        listingDA.getSelectedListingByCategory(req, res);
    } catch (error) {
        console.log(error);
    }
}