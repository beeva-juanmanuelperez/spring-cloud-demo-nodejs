var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var session = require('express-session');

// Populates req.session
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'atomic mouse'
}));

var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');

//Template engine
var swig = require('swig');
//Logger Format utilities
var util = require('util');
//REST Client
var restify = require('restify');

// App engine
app.engine('html', swig.renderFile);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var port = 3000;

// Start server
app.listen(port);
util.log(util.format("Server listening at port %s", port));

// Configure REST Client to be used in the rest of the modules
var restClient = restify.createJsonClient(
    {
        url: "http://localhost:10001",
        version: '*'
    }
);

// Exports the configuration
module.exports = {
    app: app,
    restClient: restClient
};

// Prepare routes and error handlers

//Add routes to detect the enabled endpoints
require('./routes/index');