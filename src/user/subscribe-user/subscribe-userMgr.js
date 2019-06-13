var subscribeMgr = require('./subscribe-userDA');

exports.createSubscribeUser = function (req, res) {
    try {
        subscribeMgr.createSubscribeUser(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.getSelectedSubscriberUser = function (req, res) {
    try {
        subscribeMgr.getSelectedSubscriberUser(req, res);
    } catch (error) {
        console.log(error);
    }
}