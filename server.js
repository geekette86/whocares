//Dependecies
var express = require('express');
var app = express();
var port =process.env.PORT || 1234;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
//Database
var configDB = require('./config/database.js');
var configDB = require('./config/database.js');
//configurata and connection to dtabase
mongoose.connect(configDB.url);
require('./config/passport')(passport);
//set up our express application 
app.use(morgan('dev'));//log every request to the console
app.use(cookieParser());//read cookies
app.use(bodyParser());//get information from html forms
//set up ejs for template
app.set('view engine', 'ejs');
//required for passport
app.use(session({ secret: 'fromhardcodingtojavascripthalouliya'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//routes 
require('./app/routes.js')(app, passport);
//start server
app.listen(port);
console.log('Fired up @' + port);
