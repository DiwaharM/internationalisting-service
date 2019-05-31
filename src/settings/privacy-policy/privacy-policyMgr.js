var privacyDA = require('./privacy-policyDA');

exports.getPrivacyPolicy = function (req, res) {
    try {
        privacyDA.getPrivacyPolicy(req, res);
    } catch (error) {
        console.log(error);
    }
}