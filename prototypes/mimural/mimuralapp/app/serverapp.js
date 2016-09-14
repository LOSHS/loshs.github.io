var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// Test
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Proteger estas URLs
app.all('/rest*', [require('./security/requestValidator')]);
app.all('/director*', [require('./security/requestValidator')]);
app.all('/superadmin*', [require('./security/requestValidator')]);
// Ya cambio la ruta
//app.all('/superadmin*', [require('./security/requestValidator')]);
app.use(express.static('../../mimuralpages'));
app.use('/', require('./routes/router'));

// Manejar 404's
app.use(function (req, res) {
  var user = (req.cookies && req.cookies.userLoginToken &&
          req.cookies.userLoginToken.user);
  if (user && (user.role === 'Super Administrador' || user.role === 'Tester')) {
    res.redirect('/superadmin/usuarios');
  } else if (user && user.role === 'Director') {  // diferentes roles
    res.redirect('/director/mural');
  } else {  // Los perfiles de padres de familia deben ser redirigidos a su propia pagina
    //response.redirect('/padres/mural');
    res.redirect('/director/mural');  // Este los dirije al login
  }
  //res.sendStatus(404);
});


app.set('port', process.env.PORT || 80);
var server = app.listen(app.get('port'), function () {
  console.log('Loshs Mi Mural server corriendo en ' + server.address().address + ':' + server.address().port);
});