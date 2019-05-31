var settingRoute = require('../src/settings/settingsRoute');
var userRoute = require('./user/userRoute');
var listingRoute = require('./listing/listingRoute');

exports.loadRoutes = function (app) {
    settingRoute(app);
    userRoute(app);
    listingRoute(app);
}