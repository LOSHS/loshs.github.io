var crypto = require('crypto');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');

var mySql = require('./mysqldb');


module.exports = function(app){

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  
  
  
  app.get('/login-token', function(request, response){
    response.writeHead(400, {'content-type': 'text/html'});
    response.end("Use metodo POST para ingresar sus credenciales");
  });
  
  

  app.post('/login-token', function(request, response){
    var token = secureRandomBase64(25);
    
    if (!request.body.lg_username || !request.body.lg_password) {
      if (!request.body.lg_username) {
        console.log('Falta usuario');
      }
      if (!request.body.lg_password) {
        console.log('Falta contrasena');
      }
      console.log('');
      response.writeHead(400, {'content-type': 'text/html'});
      response.end("Faltan usuario o contrasena");
      return;
    }
    
    mySql.pool.getConnection(function(err, connection) {
      if (err) {
        throw err;
      }
      connection.query('SELECT password_hash FROM users WHERE user_code = ' + mySql.pool.escape(request.body.lg_username), function(err, rows) {
      //connection.query('SELECT password_hash FROM users WHERE user_id = 1', function(err, rows) {
        if (err) { 
          throw err;
        }
        else {
          numRows = rows.length;
          if(numRows !== 1) {
            console.log('El usuario ' + request.body.lg_username + ' no existe');
            console.log('');
            //response.redirect('/login');
            response.writeHead(304, {'content-type': 'text/html'});
            response.end("Usuario no encontrado");
          }
          else {
            console.log('Usuario ' + request.body.lg_username + ' encontrado');
            bcrypt.compare(request.body.lg_password, rows[0].password_hash, function(err, result) {
            //bcrypt.compare('Loshs123hugo', rows[0].password_hash, function(err, result) {
              if(result) {
                console.log('Contrasena correcta');
                console.log('');
                
                //response.clearCookie('securityToken', { path: '/' });
                response.cookie('securityToken', token, { path: '/' });
                response.writeHead(200, {'content-type': 'text/html'});
                response.end("OK");
              }
              else{
                console.log('Contrasena incorrecta');
                console.log('');
                response.writeHead(401, {'content-type': 'text/html'});
                response.end("Constrasena incorrecta");
              }
            });
            
          }
        }
        connection.release();
      });
    });
  });


  function secureRandomBase64 (len) {
    return crypto.randomBytes(Math.ceil(len * 3 / 4))
      .toString('base64')   // convert to base64 format
      .slice(0, len)        // return required number of characters
      .replace(/\+/g, '0')  // replace '+' with '0'
      .replace(/\//g, '0'); // replace '/' with '0'
  }
  
  
};