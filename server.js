var express = require('express');
var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.get('/', function (req, res){
   res.send("Hi, This is the landing page for Web Development 2016!. Append the URL with '/hello' to see the " +
       " 'Hello World' message.")
});
app.get('/hello', function(req, res){
  res.send('Hello World!');
});
app.listen(port, ipaddress);