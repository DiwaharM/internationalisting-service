var supportDA = require('./supportDA');

exports.getSupport = function (req, res) {
    try {
        supportDA.getSupport(req, res);
    } catch (error) {
        console.log(error);
    }
}