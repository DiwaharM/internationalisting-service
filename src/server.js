var express = require('express'),
    app = express(),
    port = process.env.PORT || 3005,
    bodyParser = require('body-parser');
var cors = require('cors');
var routes = require('./route');
app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());
routes.loadRoutes(app);
app.listen(port);

app.get('/test', function (req, res) {
    res.send("Success!");
})

var mongoDBconfig = require('./config/mongoDatabase.config');
var mongoose = require('mongoose');

mongoose.connect(mongoDBconfig.url, {
    useNewUrlParser: true
});

mongoose.connection.on('error', function () {
    console.log('Could not connect to database.....Exit now');
    process.exit();
});

mongoose.connection.once('open', function () {
    console.log('Successfully connected');
});



module.exports = app;
console.log('Internation listing successfully connected on ' + port);