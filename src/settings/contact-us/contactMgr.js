var contactDA = require('./contactDA');

exports.getContact = function (req, res) {
    try {
        contactDA.getContact(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.createContact = function (req, res) {
    try {
        contactDA.createContact(req, res);
    } catch (error) {
        console.log(error);
    }
}