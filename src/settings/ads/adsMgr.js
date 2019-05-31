var adsDA = require('./adsDA');

exports.getAllAds = function (req, res) {
    try {
        adsDA.getAllAds(req, res);
    } catch (error) {
        console.log(error);
    }
}