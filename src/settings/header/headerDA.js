var headerDetail = require('../../model/header.model');
var appSetting = require('../../config/appSetting');
var fs = require('fs');

exports.getImageForHeader = function (req, res) {
    headerDetail.find({}).sort({
        position: 1
    }).exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            if (data.length === 0) {
                res.status(200).json(data);
            } else {
                for (let i = 0; i <= data.length - 1; i++) {
                    data[i].logoImageName = appSetting.headerServerPath + data[i].logoImageName;
                }
                res.status(200).json(data);
            }

        }
    })
}