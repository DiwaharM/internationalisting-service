var contactDA = require('./contactDA');

exports.getContact = function (req, res) {
    try {
        contactDA.getContact(req, res);
    } catch (error) {
        console.log(error);
    }
}