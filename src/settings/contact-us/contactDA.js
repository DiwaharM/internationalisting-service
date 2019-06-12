var contactDetail = require('../../model/contact.model');

exports.getContact = function (req, res) {
    contactDetail.find({}).select().exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(data);
        }
    })
}

exports.createContact = function(req, res) {
    var create = new contactDetail(req.body);
    create.save(function(err, data) {
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(data);
        }
    })
}
