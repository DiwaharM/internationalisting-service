var reviewDA = require('./reviewDA');

exports.createReview = function (req, res) {
    try {
        reviewDA.createReview(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.getReview = function (req, res) {
    try {
        reviewDA.getReview(req, res);
    } catch (error) {
        console.log(error);
    }
}