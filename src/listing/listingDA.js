var listing = require('../model/business-user-account.model');
var appSetting = require('../config/appSetting');

exports.getListingByCategory = function (req, res) {
    listing.find({
        'category': req.params.id
    }).select().exec(function (err, data) {
        if (err) {
            res.status(500).json(data);
        } else {
            for (let i = 0; i <= data.length - 1; i++) {
                data[i].logImageName = appSetting.businessUserServerPath + data[i]._id + '/' + 'logo' + '/' + data[i].logImageName;
            }
            res.status(200).json(data);
        }
    })
}
exports.getSelectedListingByCategory = function (req, res) {
    listing.find({
        '_id': req.params.id
    }).select().exec(function (err, data) {
        if (err) {
            res.status(500).json(data);
        } else {
            for (let i = 0; i <= data.length - 1; i++) {
                data[i].logImageName = appSetting.businessUserServerPath + data[i]._id + '/' + 'logo' + '/' + data[i].logImageName;
                for (let j = 0; j <= data[i].companyImageName.length - 1; j++) {
                    data[i].companyImageName[j] = appSetting.businessUserServerPath + data[i]._id + '/' + 'companyImage' + '/' + data[i].companyImageName[j];
                }
            }
            res.status(200).json(data);
        }
    })
}