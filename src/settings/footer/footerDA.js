var footerDetail = require('../../model/footer.model');
var appSetting = require('../../config/appSetting');

exports.getFooterDetail = function(req, res) {
    footerDetail.find({}).select().exec(function(err, footerData) {
        if(err) {
            res.status(500).json(err);
        } else {
            if (footerData.length !== 0) {
                footerData[0].logoImageName = appSetting.footerServerPath + footerData[0].logoImageName;
            }
            res.status(200).json(footerData);
        }
    })
}