//Require express module to route to the given URL
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
// With below syntax for ipaddress and port, the application can run both locally and on openshift.
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//app.get('/', function (req, res){
//   //res.send("Hi..I am Sanjiv, This is the landing page for Web Development 2016!. Append the URL with '/hello' to see the " +
//   //    " 'Hello World' message.")
//    res.sendfile('home.view.html');
//});

app.get('/hello', function(req, res){
  res.send('Hello World!');
});
app.listen(port, ipaddress);