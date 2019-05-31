var supportDetail = require('../../model/support.model');

exports.getSupport = function (req, res) {
    supportDetail.find({}).select().exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(data);
        }
    })
}