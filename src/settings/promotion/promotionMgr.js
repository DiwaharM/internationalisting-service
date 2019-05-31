var promotionDA = require('./promotionDA');

exports.getPromotion = function (req, res) {
    try {
        promotionDA.getPromotion(req, res);
    } catch (error) {
        console.log(error);
    }
}