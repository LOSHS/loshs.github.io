var express = require('express');
var bodyParser = require('body-parser');

var app = express();

require('./login')(app);

app.get('/', function (req, res) {
  res.redirect('/login');
  console.log("Request at /");
});

app.use(express.static('static'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var server = app.listen(8081, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Listening at http://%s:%s", host, port);

});











