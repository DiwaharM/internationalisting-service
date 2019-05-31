var adsDetail = require('../../model/ads.model');
var appSetting = require('../../config/appSetting');

exports.getAllAds = function (req, res) {
    adsDetail.find({}).select().exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            for (let i = 0; i <= data.length - 1; i++) {
                data[i].adsImageName = appSetting.adsServerPath + data[i].adsImageName;
            }
            res.status(200).json(data);
        }
    })
}