var termsDA = require('./termsDA');
exports.getTermsAndUse = function (req, res) {
    try {
        termsDA.getTermsAndUse(req, res);
    } catch (error) {
        console.log(error);
    }
}