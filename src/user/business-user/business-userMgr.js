var businessDA = require('./business-userDA');
var mkdirp = require('mkdirp');
const multer = require('multer');
var appSetiing = require('../../config/appSetting');

/* exports.createBusinessUser = function (req, res) {
    try {
        const PATH = appSetiing.businessUserUploadPath;
        let storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, PATH);
                businessDA.createBusinessUser(req,file,res);
            },
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            }
        });

        let upload = multer({
            storage: storage
        }).array('uploads[]', 20); 
        upload(req, res, function (err) {
            if (err) {
                console.log(err);
                return res.status(501).json({
                    error: err
                });
            }
        });

    } catch (error) {
        console.log(error);
    }
}
 */
exports.createBusinessUser = function (req, res) {
    try {
        businessDA.createBusinessUser(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.getAllCategory = function (req, res) {
    try {
        businessDA.getAllCategory(req, res);
    } catch (error) {
        console.log(error);
    }
}

exports.SelecetedSubCategory = function (req, res) {
    try {
        businessDA.SelecetedSubCategory(req, res);
    } catch (error) {
        console.log(error);
    }
}

exports.addCompanyDetails = function (req, res) {
    try {
        businessDA.addCompanyDetails(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.createLogoImage = function (req, res) {
    try {
        const DIR = appSetiing.businessUserUploadPath;
        const PATH1 = DIR + '/' + req.params.id;
        mkdirp(PATH1);
        const PATH2 = PATH1 + '/' + 'logo';
        mkdirp(PATH2);

        let storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, PATH2);
                businessDA.createLogoImage(req, file, res);
            },
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            }
        });

        let upload = multer({
            storage: storage
        }).array('uploads[]', 20); //only 20 images can be uploaded
        upload(req, res, function (err) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    error: err
                });
            }
            /*  else {
                            res.status(404).json(result);
                        } */
        });

    } catch (error) {
        console.log(error);
    }
}
exports.businessLogin = function (req, res) {
    try {
        businessDA.businessLogin(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.getProfile = function (req, res) {
    try {
        businessDA.getProfile(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.uploadCompanyImage = function (req, res) {
    try {
        var firstValue = [];
        const DIR = appSetiing.businessUserUploadPath;
        const PATH = DIR + '/' + req.params.id + '/' + 'companyImage' + '/';
        mkdirp(PATH);
        let storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, PATH);
                /*   firstValue.push(file.originalname); */
                businessDA.uploadCompanyImage(req, file, res);
            },
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            }
        });

        let upload = multer({
            storage: storage
        }).array('uploads[]', 20); //only 20 images can be uploaded
        upload(req, res, function (err) {
            if (err) {
                console.log(err);
                return res.status(501).json({
                    error: err
                });
            }
        });

    } catch (error) {
        console.log(error);
    }
}

exports.getPackageDetail = function (req, res) {
    try {
        businessDA.getPackageDetail(req, res);
    } catch (error) {
        console.log(error);
    }
}

exports.updateProfileDetails = function (req, res) {
    try {
        businessDA.updateProfileDetails(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.getSelectedBusinessUser = function (req, res) {
    try {
        businessDA.getSelectedBusinessUser(req, res);
    } catch (error) {
        console.log(error);
    }
}

exports.changePassword = function (req, res) {
    try {
        businessDA.changePassword(req, res);
    } catch (error) {
        console.log(error);
    }
}

exports.getSimilarCompany = function (req, res) {
    try {
        businessDA.getSimilarCompany(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.createIndes = function (req, res) {
    try {
        businessDA.createIndes(req, res);
    } catch (error) {
        console.log(error);
    }
}

exports.getSearch = function (req, res) {
    try {
        businessDA.getSearch(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.saveViewCount = function (req, res) {
    try {
        businessDA.saveViewCount(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.getVistiorCount = function (req, res) {
    try {
        businessDA.getVistiorCount(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.getClientToken = function (req, res) {
    try {
        businessDA.getClientToken(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.createPayment = function (req, res) {
    try {
        businessDA.createPayment(req, res);
    } catch (error) {
        console.log(error);
    }
}

exports.getPaymentPackage = function (req, res) {
    try {
        businessDA.getPaymentPackage(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.checkExpiry = function (req, res) {
    try {
        businessDA.checkExpiry(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.updatePayment = function (req, res) {
    try {
        businessDA.updatePayment(req, res);
    } catch (error) {
        console.log(error);
    }
}

exports.addRazorPayDetails = function (req, res) {
    try {
        businessDA.addRazorPayDetails(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.deleteSingleCompanyImage = function (req, res) {
    try {
        businessDA.deleteSingleCompanyImage(req, res);
    } catch (error) {
        console.log(error);
    }
}
