var footerDA = require('./footerDA');

exports.getFooterDetail = function(req, res) {
    try {
        footerDA.getFooterDetail(req, res);
    } catch (error) {
        console.log(error);
    }
}