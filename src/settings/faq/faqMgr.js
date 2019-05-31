var faqDA = require('./faqDA');

exports.getFaq = function (req, res) {
    try {
        faqDA.getFaq(req, res);
    } catch (error) {
        console.log(error);
    }
}