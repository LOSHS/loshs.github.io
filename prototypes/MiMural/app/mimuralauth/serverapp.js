var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.all('/director*', [require('./security/requestValidator')]);
app.all('/superadmin*', [require('./security/requestValidator')]);


app.use(express.static('static'));

app.use('/', require('./routes/router'));


app.use(function(req, res) {
  res.sendStatus(404);
});


app.set('port', process.env.PORT || 8081);
var server = app.listen(app.get('port'), function() {
  console.log('Express server en ' + server.address().port);
});