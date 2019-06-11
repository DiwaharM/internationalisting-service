var reviewDetail = require('../../model/review.model');

exports.createReview = function (req, res) {
    var currentDate = new Date();
    var date = currentDate.getDate();
    var month = currentDate.getMonth();
    var year = currentDate.getFullYear();
    var dateString = date + "/" + (month + 1) + "/" + year;

    var CreateReview = new reviewDetail();
    CreateReview.reviewTitle = req.body.reviewTitle;
    CreateReview.reviewDescription = req.body.reviewDescription;
    CreateReview.userName = req.body.userName;
    CreateReview.date = dateString;
    CreateReview.listingName = req.body.listingName;
    CreateReview.listingID = req.body.listingID;
    CreateReview.save(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(data);
        }
    })
}

exports.getReview = function (req, res) {
    reviewDetail.find({
        'listingID': req.params.id
    }).select().exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(data);
        }
    })
}