var businessUserDetail = require('../../model/business-user-account.model');
var categoryDetail = require('../../model/superCategory.model');
var appSetting = require('../../config/appSetting');
var customerLogs = require('../../model/customerLog.model');
var paymentPackage = require('../../model/paymentPackage.model');
var fs = require('fs');
var Razorpay = require('razorpay');
var instance = new Razorpay({
  key_id: 'rzp_live_8qoHdemEkXVG4k',
  key_secret: 'eZcVK8TMXEpSiQJPNu70l6H0'
})

exports.createBusinessUser = function (req, res) {
    var createBusUser = new businessUserDetail();
    createBusUser.firstName = req.body.firstName;
    createBusUser.lastName = req.body.lastName;
    createBusUser.companyName = req.body.companyName;
    createBusUser.country = req.body.country;
    createBusUser.emailId = req.body.emailId;
    createBusUser.mobileNumber = req.body.mobileNumber;
    createBusUser.password = req.body.password;
    createBusUser.save(function (err, userFirstSave) {
        if (err) {
            res.status(500).json(err);
        } else {
            paymentPackage.findOne({
                '_id': req.body.checkID
            }).select().exec(function (err, packageData) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    var currentDate = new Date();
                    var startDay = currentDate.getDate();
                    var startMonth = currentDate.getMonth() + 1;
                    var startYear = currentDate.getFullYear();
                    var starting = startMonth + "/" + startDay + "/" + startYear;
                    var lastDate = new Date();
                    lastDate.setDate(currentDate.getDate() + packageData.duration);
                    var closingDay = lastDate.getDate();
                    var closingMonth = lastDate.getMonth() + 1;
                    var closingYear = lastDate.getFullYear();
                    var closing = closingMonth + "/" + closingDay + "/" + closingYear;
                    let package = {
                        grade: packageData.grade,
                        duration: packageData.duration,
                        month: packageData.month,
                        amount: packageData.amount,
                        startingDate: starting,
                        closingDate: closing,
                        active: true
                    }
                    var options = {
                        // amount in pase
                        amount: packageData.amount ,
                        currency: "INR",
                        receipt: "RCPTID43",
                        payment_capture: '1'
                      };
                      instance.orders.create(options, function(err, order) { 
                          if(err) {
                              console.log(err);
                          } else {
                            businessUserDetail.findOneAndUpdate({
                                "_id": userFirstSave._id
                            }, {
                                razorpayOrderId: order.id,
                                $push: {
                                    packageDetails: package
                                },
                                
                            }, function (err, data) {
                                if (err) {
                                    res.status(500).json(err);
                                } else {
                                    businessUserDetail.findOne({
                                        '_id': userFirstSave._id
                                    }).select().exec(function (err, data) {
                                        if (err) {
                                            res.status(500).json(err);
                                        } else {
                                            res.status(200).json(data);
                                        }
                                    })
                                    
                                }
                            })
                             /* res.status(200).json(order); */
                          }
                      })
                   
                }
            })
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
    var temp = [];
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
                    data.save(function (err, data1) {
                        if (err) {
                            res.status(500).send({
                                "result": 0
                            });
                        } else {
                            console.log(data1);
                        }
                    })
                }
            } else {
                data.companyImageName.push(file.originalname);
                data.save(function (err, data) {
                    if (err) {
                        res.status(500).send({
                            "result": 0
                        });
                    } else {
                       /*  res.status(200).json(true); */
                        console.log(data);
                    }
                })
            }

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
            
            if(data.packageDetails.length !== 0) {
            firstValue = data.packageDetails;
            secondValue = firstValue.filter(value => value.active === true);
            res.status(200).json(secondValue);
        } else {
            res.status(200).json(data);
        }
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
    businessUserDetail.find({
        $text: {
            $search: req.body.search
        }
    }).select().exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(data);
        }
    })
}
exports.getSearch = function (req, res) {
    /* businessUserDetail.createIndexes({
        "companyName": "text",
        "categoryName": "text",
        "subCategoryName": "text",
        "country": "text"
    }) */
    businessUserDetail.find({
        $text: {
            $search: req.params.search
        }
    }, {
        score: {
            $meta: "textScore"
        }
    }).sort({
        score: {
            $meta: "textScore"
        }
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
exports.getClientToken = function (req, res) {
    gateway.clientToken.generate({}, function (err, response) {
        var clientToken = response.clientToken;
       if(err) {
           console.log(err);
       } else {
        res.status(200).json(clientToken);
       }
        
      });
}
exports.createPayment = function (req, res) {
    var nonceFromTheClient = req.params.id;
    // Create a new transaction for $10
    var newTransaction = gateway.transaction.sale({
      amount: '1.00',
      paymentMethodNonce: nonceFromTheClient,  // fake payment method
      options: {
        // This option requests the funds from the transaction
        // once it has been authorized successfully
        submitForSettlement: true,
        paypal: {
          customField: "custom",
          description: "description"
      }
      }
    }, function(error, result) {
        if (result) {
          console.log('result', result);
          res.send(result);
        } else {
          console.log(err);
          res.status(500).send(error);
        }
    });
}

exports.getPaymentPackage = function (req, res) {
    paymentPackage.find({}).sort({
        grade: 1
    }).exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(data);
        }
    })
}

exports.checkExpiry = function (req, res) {
    var currentDate = new Date();
    businessUserDetail.updateMany({
        'packageDetails.closingDate': {
            $lt: currentDate
        },
        'packageDetails.active': true
    }, {
        $set: {
            'packageDetails.$.active': false
        }
    }).exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(data);
        }
    })
}

exports.updatePayment = function (req, res) {
    paymentPackage.findOne({
        '_id': req.body.checkID
    }).select().exec(function (err, packageDetail) {
        if (err) {
            res.status(500).json(err);
        } else {
            var currentDate = new Date();
            var startDay = currentDate.getDate();
            var startMonth = currentDate.getMonth() + 1;
            var startYear = currentDate.getFullYear();
            var starting = startMonth + "/" + startDay + "/" + startYear;
            var lastDate = new Date();
            lastDate.setDate(currentDate.getDate() + packageDetail.duration);
            var closingDay = lastDate.getDate();
            var closingMonth = lastDate.getMonth() + 1;
            var closingYear = lastDate.getFullYear();
            var closing = closingMonth + "/" + closingDay + "/" + closingYear;
            let updateData = {
                grade: packageDetail.grade,
                duration: packageDetail.duration,
                amount: packageDetail.amount,
                startingDate: starting,
                closingDate: closing,
                active: true
            }
            businessUserDetail.findOneAndUpdate({
                '_id': req.params.id
            }, {
                $push: {
                    packageDetails: updateData
                }
            }, function (err, data) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(data);
                }
            })
        }
    })
}
exports.addRazorPayDetails = function (req, res) {
    businessUserDetail.findOne({
        '_id': req.params.id
    }).select().exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            data.razorpayPaymentId = req.body.paymentId;
            data.razorpaySignature = req.body.razorpaySignature;
            data.paymentStatus = 'Success';
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
exports.deleteSingleCompanyImage = function(req, res) {
    businessUserDetail.findOne({'_id': req.params.id}).select().exec(function(err, data) {
        if(err) {
            res.status(500).json(err);
        } else {
            const PATH = appSetting.businessUserUploadPath + '/' + req.params.id + '/' + 'companyImage' + '/' + req.body.companyImageName;
            fs.unlink(PATH, (err) => {
                if(err) {
                    throw err;
                } else {
                    businessUserDetail.update({'_id': req.params.id}, { $pull: {companyImageName: req.body.companyImageName}}).select().exec(function(err, data) {
                        if(err) {
                            res.status(500).json(err);
                        } else {
                            businessUserDetail.find({}).select().exec(function(err, data) {
                                if(err) {
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
                    })
                }
            })
        }
    })
}

exports.updateCompanyDetail = function (req, res) {
    businessUserDetail.findOne({
        '_id': req.params.id
    }).select().exec(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            data.listingCompanyName = req.body.listingCompanyName;
            data.listingCountry = req.body.listingCountry;
            data.listingEmailId = req.body.listingEmailId;
            data.categoryName = req.body.categoryName;
            data.subCategoryName = req.body.subCategoryName;
            data.listingMobileNumber = req.body.listingMobileNumber;
            data.weblink = req.body.weblink;
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