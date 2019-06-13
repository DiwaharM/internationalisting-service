var reportDA = require('./reportDA');

exports.getSelectedReport = function (req, res) {
    try {
        reportDA.getSelectedReport(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.getCurrentReport = function (req, res) {
    try {
        reportDA.getCurrentReport(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.getSubscriberSelectedReport = function (req, res) {
    try {
        reportDA.getSubscriberSelectedReport(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.getSubscriberCurrentReport = function (req, res) {
    try {
        reportDA.getSubscriberCurrentReport(req, res);
    } catch (error) {
        console.log(error);
    }
}