var express = require('express');

var app = express();
require('./login')(app);


app.use(express.static('static'));


app.get('/', function (req, res) {
  res.redirect('/login');
  console.log("Request at /");
});


var server = app.listen(8081, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Listening at http://%s:%s", host, port);

});