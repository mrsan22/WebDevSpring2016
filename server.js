//Require express module to route to the given URL
var express = require('express');
var app = express();
var bodyParser    = require('body-parser'); // for parsing req.body
var multer = require('multer'); //for parsing JSON
var cookieParser = require('cookie-parser'); //Parsing cookies for session
var session = require('express-session'); //For maintaining sessions
var uuid = require('node-uuid'); //For generating _id
var mongoose = require('mongoose'); //For accessing mongodb database
var passport = require('passport');

//Create a default session string
var connectionString = 'mongodb://127.0.0.1:27017/formbuilder';
console.log(connectionString);

//Use remote connection string if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
  connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
      process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
      process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
      process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
      process.env.OPENSHIFT_APP_NAME;

  console.log(connectionString);
}

// connect to the database
var db = mongoose.connect(connectionString);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer());
app.use(session({secret: process.env.PASSPORT_SECRET, resave: true, saveUninitialized: true}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
//console.log(process.env.PASSPORT_SECRET);
// With below syntax for ipaddress and port, the application can run both locally and on openshift.
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//app.get('/', function (req, res){
//   //res.send("Hi..I am Sanjiv, This is the landing page for Web Development 2016!. Append the URL with '/hello' to see the " +
//   //    " 'Hello World' message.")
//    res.sendfile('home.view.html');
//});

//app.get('/hello', function(req, res){
//  res.send('Hello World!');
//});

var userModelAssignment = require("./public/assignment/server/models/user.model.server.js")(uuid, db, mongoose);
var userModelProject = require("./public/project/server/models/user.model.server.js")(uuid, db, mongoose);

var securityService = require("./public/Common-service/security.js")(userModelAssignment, userModelProject);

//Define require for other modules
require("./public/assignment/server/app.js")(app, uuid,db, mongoose, userModelAssignment, securityService);
//For Project
require("./public/project/server/app.js")(app, uuid,db, mongoose, userModelProject, securityService);

app.listen(port, ipaddress);