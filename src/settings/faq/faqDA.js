var faqDetails = require('../../model/faq.model');

exports.getFaq = function (req, res) {
    faqDetails.find({}).select().exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(data);
        }
    })
}