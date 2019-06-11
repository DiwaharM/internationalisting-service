var subscribeDetail = require('../../model/user-subscrie.model');

exports.createSubscribeUser = function (req, res) {
    subscribeDetail.find({
        'mobileNumber': req.body.mobileNumber,
        'firstName': req.body.firstName,
        'emailId': req.body.emailId
    }).select().exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            if (data.length !== 0) {
                res.status(200).json(data);
            } else {
                var userValue = new subscribeDetail(req.body);
                userValue.save(function (err, data1) {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        /* res.status(200).json(data); */
                        subscribeDetail.find({
                            '_id': data1.id
                        }).select().exec(function (err, data) {
                            if (err) {
                                res.status(500).json(err);
                            } else {
                                res.status(200).json(data);
                            }
                        })
                    }
                })
            }
        }
    })
}

exports.getSelectedSubscriberUser = function (req, res) {
    subscribeDetail.findOne({
        '_id': req.params.id
    }).select().exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(data);
        }
    })
}