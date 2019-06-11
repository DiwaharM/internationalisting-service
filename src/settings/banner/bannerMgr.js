var bannerMgr = require('./bannerDA');

exports.getBanners = function (req, res) {
    try {
        bannerMgr.getBanners(req, res);
    } catch (error) {
        console.log(error);
    }
}