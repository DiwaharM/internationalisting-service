var listingMgr = require('./listingMgr');

module.exports = function (app) {

    app.route('/getlistinglist/:id')
        .get(listingMgr.getListingByCategory);

    app.route('/getselectedlistinglist/:id')
        .get(listingMgr.getSelectedListingByCategory);
}