var privacyDetail = require('../../model/privacy-policy.model');

exports.getPrivacyPolicy = function (req, res) {
    privacyDetail.find({}).select().exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(data);
        }
    })
}