var headerDA = require('./headerDA');

exports.getImageForHeader = function (req, res) {
    try {
        headerDA.getImageForHeader(req, res);
    } catch (error) {
        console.log(error);
    }
}