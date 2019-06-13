var businessuserDetail = require('../../model/business-user-account.model');
var subscribedUser = require('../../model/user-subscrie.model');
var mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.getSelectedReport = function (req, res) {
    businessuserDetail.aggregate([{
            $match: {
                _id: ObjectId(req.params.id)
            }

        }, {
            $unwind: "$customerLogs"
        },
        {
            $project: {
                customerID: '$customerLogs.customerID',
                date: '$customerLogs.date'
            }
        }, {
            $lookup: {
                "from": "businessuseraccounts",
                "localField": "customerID",
                "foreignField": "_id",
                "as": "joinedtable"
            },
        }, {
            $match: {
                "joinedtable": {
                    $ne: []
                }
            }
        }
    ]).exec(function (err, data) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            })
        } else {
            res.status(200).json(data);
        }
    })
}
exports.getCurrentReport = function (req, res) {
    businessuserDetail.aggregate([{
            $match: {
                _id: ObjectId(req.params.id)
            }
        }, {
            $unwind: "$customerLogs"
        },
        {
            $project: {
                customerID: '$customerLogs.customerID',
                date: '$customerLogs.date',
            }
        },
        {
            $match: {
                date: req.body.date
            }
        }, {
            $lookup: {
                "from": "businessuseraccounts",
                "localField": "customerID",
                "foreignField": "_id",
                "as": "joinedtable"
            },
        }, {
            $match: {
                "joinedtable": {
                    $ne: []
                }
            }
        }
    ]).exec(function (err, data) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            })
        } else {
            res.status(200).json(data);
        }
    })
}
exports.getSubscriberSelectedReport = function (req, res) {
    businessuserDetail.aggregate([{
            $match: {
                _id: ObjectId(req.params.id)
            }
        }, {
            $unwind: "$customerLogs"
        },
        {
            $project: {
                customerID: '$customerLogs.customerID',
                date: '$customerLogs.date'
            }
        }, {
            $lookup: {
                "from": "usersubscribes",
                "localField": "customerID",
                "foreignField": "_id",
                "as": "joinedtable"
            },
        }, {
            $match: {
                "joinedtable": {
                    $ne: []
                }
            }
        }
    ]).exec(function (err, data) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            })
        } else {
            res.status(200).json(data);
        }
    })
}
exports.getSubscriberCurrentReport = function (req, res) {
    businessuserDetail.aggregate([{
            $match: {
                _id: ObjectId(req.params.id)
            }
        }, {
            $unwind: "$customerLogs"
        },
        {
            $project: {
                customerID: '$customerLogs.customerID',
                date: '$customerLogs.date',
            }
        },
        {
            $match: {
                date: req.body.date
            }
        }, {
            $lookup: {
                "from": "usersubscribes",
                "localField": "customerID",
                "foreignField": "_id",
                "as": "joinedtable"
            },
        }, {
            $match: {
                "joinedtable": {
                    $ne: []
                }
            }
        }
    ]).exec(function (err, data) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            })
        } else {
            res.status(200).json(data);
        }
    })
}