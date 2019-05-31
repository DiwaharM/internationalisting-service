var subscribeMgr = require('./subscribe-user/subscribe-userMgr');
var businessUserMgr = require('./business-user/business-userMgr');
var reviewMgr = require('./review/reviewMgr');
var reportMgr = require('./report/reportMgr');

module.exports = function (app) {
    app.route('/makesubscribe').post(subscribeMgr.createSubscribeUser);
    app.route('/createbusinessuser').post(businessUserMgr.createBusinessUser);
    app.route('/getallcategory').get(businessUserMgr.getAllCategory);
    app.route('/getselectedsubcategory').post(businessUserMgr.SelecetedSubCategory);
    app.route('/storecompanydetails/:id').post(businessUserMgr.addCompanyDetails);
    app.route('/createlogoimage/:id').put(businessUserMgr.createLogoImage);
    app.route('/businesslogin').post(businessUserMgr.businessLogin);
    app.route('/getselectedbusinessuser/:id').get(businessUserMgr.getProfile);
    app.route('/uploadcompanyimage/:id').post(businessUserMgr.uploadCompanyImage);
    app.route('/getselectedpackage/:id').get(businessUserMgr.getPackageDetail);
    app.route('/updateprofile/:id').post(businessUserMgr.updateProfileDetails);
    app.route('/getbusinessusername/:id').get(businessUserMgr.getSelectedBusinessUser);
    app.route('/getsubscriberusername/:id').get(subscribeMgr.getSelectedSubscriberUser);
    app.route('/createreview').post(reviewMgr.createReview);
    app.route('/getselectedreviews/:id').get(reviewMgr.getReview);
    app.route('/changepassword/:id').post(businessUserMgr.changePassword);
    app.route('/getsimilarcomany/:id').get(businessUserMgr.getSimilarCompany);
    app.route('/search/:search').get(businessUserMgr.getSearch);
    app.route('/set').post(businessUserMgr.createIndes);

    app.route('/addviewcounting/:id').post(businessUserMgr.saveViewCount);
    app.route('/visitorcountforeveryday/:id').post(businessUserMgr.getVistiorCount);
    app.route('/selectedreport/:id').get(reportMgr.getSelectedReport);
    app.route('/selectedcurrentreport/:id').post(reportMgr.getCurrentReport);
    app.route('/subscriberselectedreport/:id').get(reportMgr.getSubscriberSelectedReport);
    app.route('/subscriberselectedcurrentreport/:id').post(reportMgr.getSubscriberCurrentReport);
}