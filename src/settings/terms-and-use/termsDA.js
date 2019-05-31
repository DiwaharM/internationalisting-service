var termsDetail = require('../../model/terms-and-use.model');

exports.getTermsAndUse = function (req, res) {
    termsDetail.find({}).select().exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(data);
        }
    })
}