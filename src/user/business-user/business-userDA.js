var businessUserDetail = require('../../model/business-user-account.model');
var categoryDetail = require('../../model/superCategory.model');
var appSetting = require('../../config/appSetting');
var customerLogs = require('../../model/customerLog.model');

exports.createBusinessUser = function (req, res) {
    var CreateBusUser = new businessUserDetail();
    CreateBusUser.firstName = req.body.firstName;
    CreateBusUser.lastName = req.body.lastName;
    CreateBusUser.companyName = req.body.companyName;
    CreateBusUser.country = req.body.country;
    CreateBusUser.emailId = req.body.emailId;
    CreateBusUser.mobileNumber = req.body.mobileNumber;
    CreateBusUser.password = req.body.password;
    CreateBusUser.packageDetails = req.body.packageDetails;
    /*   CreateBusUser.listingCompanyName= req.body.listingCompanyName;
      CreateBusUser.listingCountry= req.body.listingCountry;
      CreateBusUser,listingEmailId= req.body.listingEmailId;
      CreateBusUser.listingMobileNumber= req.body.listingMobileNumber;
      CreateBusUser.weblink= req.body.weblink;
      CreateBusUser.category= req.body.category;
     
      CreateBusUser.logImageName= req.body.logImageName;
      CreateBusUser.companyImageName= req.body.companyImageName; */
    CreateBusUser.save(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(data);
        }
    })
}

exports.getAllCategory = function (req, res) {
    categoryDetail.find({}).select().exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {

            /*    var firstValue = [];
               for(let i = 0; i <= data.length - 1; i++) {
                   var secondValue = data[i].categoryName;
                   firstValue.push(secondValue);
               } */
            /*   res.status(200).json(data); */
            var categoryLength = data.length - 1;
            for (var i = 0; i <= categoryLength; i++) {
                data[i].categoryImageName = appSetting.categoryServerPath + data[i].categoryName + '/' + data[i].categoryImageName;
            }
            res.status(200).json(data);

        }
    })
}

exports.SelecetedSubCategory = function (req, res) {
    categoryDetail.find({
        '_id': req.body.category
    }).select().exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {

            /*    var firstValue = [];
               var secondValue = data.keyWord;
               for(let i = 0; i <= secondValue.length - 1; i++) {
                   var thirdValue = secondValue[i].key;
                   firstValue.push(thirdValue);
               } */
            res.status(200).json(data);
        }
    })
}

exports.addCompanyDetails = function (req, res) {
    businessUserDetail.findOne({
        '_id': req.params.id
    }).select().exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            data.listingCompanyName = req.body.listingCompanyName;
            data.listingCountry = req.body.listingCountry;
            data.listingEmailId = req.body.listingEmailId;
            data.listingMobileNumber = req.body.listingMobileNumber;
            data.weblink = req.body.weblink;
            data.category = req.body.category;
            data.subCategory = req.body.subCategory;
            data.categoryName = req.body.categoryName;
            data.subCategoryName = req.body.subCategoryName;
            data.save(function (err, data1) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(data1);
                }
            })
        }
    })
}
exports.createLogoImage = function (req, file, res) {
    businessUserDetail.find({
        '_id': req.params.id,
    }, function (err, data) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            });
        } else {
            data[0].logImageName = file.originalname;
            data[0].save(function (err, data1) {
                if (err) {
                    res.status(500).send({
                        message: 1
                    });
                } else {
                    res.status(200).json(data1);
                    /*   businessUserDetail.find({}).select().exec(function (err, data) {
                          if (err) {
                              res.status(500).send({
                                  "result": 'error occured while retreiving data'
                              })
                          } else {
                              res.status(200).json(data);
                          }
                      }) */
                }
            })
        }
    });
}

exports.businessLogin = function (req, res) {
    businessUserDetail.find({
        'emailId': req.body.emailId,
        'password': req.body.password
    }).select().exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(data);
        }
    })
}

exports.getProfile = function (req, res) {
    businessUserDetail.find({
        '_id': req.params.id
    }).select().exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            for (let i = 0; i <= data.length - 1; i++) {
                data[i].logImageName = appSetting.businessUserServerPath + data[i]._id + '/' + 'logo' + '/' + data[i].logImageName;
                for (let j = 0; j <= data[i].companyImageName.length - 1; j++) {
                    data[i].companyImageName[j] = appSetting.businessUserServerPath + data[i]._id + '/' + 'companyImage' + '/' + data[i].companyImageName[j];
                }
            }
            res.status(200).json(data);
        }
    })
}
exports.uploadCompanyImage = function (req, file, res) {
    businessUserDetail.findOne({
        '_id': req.params.id
    }).select().exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {


            if (data.companyImageName.length !== 0) {
                var ID = file.originalname;
                var i = data.companyImageName.indexOf(ID);
                if (i > -1) {
                    console.log('Exist');
                } else {
                    data.companyImageName.push(file.originalname);
                    data.save(function (err, data) {
                        if (err) {
                            res.status(500).send({
                                "result": 0
                            });
                        } else {
                            /*  console.log(data); */
                            res.status(200).json(data);
                        }
                    })
                }
            } else if (data.companyImageName.length === 0) {
                data.companyImageName.push(file.originalname);
                data.save(function (err, data) {
                    if (err) {
                        res.status(500).send({
                            "result": 0
                        });
                    } else {
                        /*  console.log(data); */
                        res.status(200).json(data);
                    }
                })
            }



            /* data[0].companyImageName = file;
            data.save(function(err, data) {
                if(err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(data);
                }
            }) */
        }
    })
}

exports.getPackageDetail = function (req, res) {
    businessUserDetail.findOne({
        '_id': req.params.id
    }).select().exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            /*  var firstValue = []; */
            firstValue = data.packageDetails;
            /*  console.log(firstValue); */
            res.status(200).json(firstValue);
        }
    })
}

exports.updateProfileDetails = function (req, res) {
    businessUserDetail.findOne({
        '_id': req.params.id
    }).select().exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            data.firstName = req.body.firstName;
            data.lastName = req.body.lastName;
            data.companyName = req.body.companyName;
            data.country = req.body.country;
            data.emailId = req.body.emailId;
            data.mobileNumber = req.body.mobileNumber;
            data.save(function (err, data1) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(data1);
                }
            })
        }
    })
}

exports.getSelectedBusinessUser = function (req, res) {
    businessUserDetail.findOne({
        '_id': req.params.id
    }).select().exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(data);
        }
    })
}


exports.changePassword = function (req, res) {
    businessUserDetail.findOne({
        '_id': req.params.id
    }).select().exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            data.password = req.body.password;
            data.save(function (err, data) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(data);
                }
            })
        }
    })
}

exports.getSimilarCompany = function (req, res) {
    businessUserDetail.find({
        'category': req.params.id
    }).select().exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            for (let i = 0; i <= data.length - 1; i++) {
                data[i].logImageName = appSetting.businessUserServerPath + data[i]._id + '/' + 'logo' + '/' + data[i].logImageName;
                for (let j = 0; j <= data[i].companyImageName.length - 1; j++) {
                    data[i].companyImageName[j] = appSetting.businessUserServerPath + data[i]._id + '/' + 'companyImage' + '/' + data[i].companyImageName[j];
                }
            }
            res.status(200).json(data);
        }
    })
}
exports.createIndes = function (req, res) {
    businessUserDetail.createIndexes({
        "companyName": "text"
    })
    businessUserDetail.find({$text: {$search: req.body.search}}).select().exec(function(err, data) {
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(data);
        }
    })
}
exports.getSearch = function (req, res) {
    businessUserDetail.createIndexes({
        "companyName": "text", "categoryName": "text", "subCategoryName": "text", "country": "text",
        "listingCompanyName": "text", "listingCountry": "text"
    })
  /*   businessUserDetail.ensureIndexes({"companyName": "text"}) */
   /*  businessUserDetail.createIndexes({"companyName": "text" , "categoryName": "text", "subCategoryName": "text", "country": "text",
    "listingCompanyName": "text", "listingCountry": "text"}) */
    businessUserDetail.find({$text: {$search: req.params.search}}, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}}).select().exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            for (let i = 0; i <= data.length - 1; i++) {
                data[i].logImageName = appSetting.businessUserServerPath + data[i]._id + '/' + 'logo' + '/' + data[i].logImageName;
                for (let j = 0; j <= data[i].companyImageName.length - 1; j++) {
                    data[i].companyImageName[j] = appSetting.businessUserServerPath + data[i]._id + '/' + 'companyImage' + '/' + data[i].companyImageName[j];
                }
            }
            res.status(200).json(data);
        }
    })
}

exports.saveViewCount = function (req, res) {

    businessUserDetail.findOne({
        '_id': req.params.id
    }).select().exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {

            var firstValue = req.body.customerLogs;
            if (data.customerLogs.length === 0) {
                data.customerLogs.push(firstValue);
                data.save(function (err, value) {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        res.status(200).json(value);
                    }
                })
            } else {
                businessUserDetail.find({
                    '_id': req.params.id,
                    'customerLogs.customerID': firstValue.customerID,
                    'customerLogs.date': firstValue.date
                }).select().exec(function (err, data1) {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        if (data1.length === 0) {
                            data.customerLogs.push(firstValue);
                            data.save(function (err, value1) {
                                if (err) {
                                    res.status(500).json(err);
                                } else {
                                    res.status(200).json(value1);
                                }
                            })
                        } else {
                            res.status(200).json(data);
                        }
                    }
                })
            }
        }
    })
}

exports.getVistiorCount = function (req, res) {
    businessUserDetail.findOne({
        '_id': req.params.id
    }).select().exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            var count = 0;
            if (data.customerLogs.length !== 0) {
                for (let i = 0; i <= data.customerLogs.length - 1; i++) {
                    if (data.customerLogs[i].date === req.body.date) {
                        count++;
                    }
                }
                res.status(200).json(count);
            } else {
                res.status(200).json(count);
            }
        }
    })
}