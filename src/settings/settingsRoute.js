var headerMgr = require('./header/headerMgr');
var bannerMgr = require('./banner/bannerMgr');
var termsMgr = require('./terms-and-use/termsMgr');
var privacyMgr = require('./privacy-policy/privacy-policyMgr');
var supportMgr = require('./support/supportMgr');
var contactMgr = require('./contact-us/contactMgr');
var faqMgr = require('./faq/faqMgr');
var promotionMgr = require('./promotion/promotionMgr');
var adsMgr = require('./ads/adsMgr');

module.exports = function (app) {
    app.route('/getheader').get(headerMgr.getImageForHeader);
    app.route('/getbanner').get(bannerMgr.getBanners);
    app.route('/gettermsanduse').get(termsMgr.getTermsAndUse);
    app.route('/getprivacypolicy').get(privacyMgr.getPrivacyPolicy);
    app.route('/getsupport').get(supportMgr.getSupport);
    app.route('/getcontact').get(contactMgr.getContact);
    app.route('/getfaq').get(faqMgr.getFaq);
    app.route('/getpromotion').get(promotionMgr.getPromotion);
    app.route('/getalllistinggradewise').get(promotionMgr.getAllListing);
    app.route('/getads').get(adsMgr.getAllAds);
}