var promotionDetail = require('../../model/promotion.model');
var appSetting = require('../../config/appSetting');

exports.getPromotion = function (req, res) {
    promotionDetail.aggregate([{

        $lookup: {
            "from": "businessuseraccounts",
            "localField": "companyId",
            "foreignField": "_id",
            "as": "joinedtable"

        },
    }, {
        $match: {
            "joinedtable": {
                $ne: []
            }
        }
    }]).exec(function (err, promotions) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            })
        } else {

            var companyLength = promotions.length - 1;
            for (var i = 0; i <= companyLength; i++) {
                var joinedTable = promotions[i].joinedtable;
                var joinedTableLength = joinedTable.length - 1;
                for (var j = 0; j <= joinedTableLength; j++) {
                    var companyImage = joinedTable[j].logImageName;
                    /*                     var companyImageLength = companyImage.length - 1;;
                                        for (var k = 0; k <= companyImageLength; k++) { */
                    joinedTable[j].logImageName = appSetting.businessUserServerPath + joinedTable[j]._id + '/' + 'logo' + '/' + joinedTable[j].logImageName;
                    /*   } */
                }
            }
            res.status(200).json(promotions);


        }
    })
}