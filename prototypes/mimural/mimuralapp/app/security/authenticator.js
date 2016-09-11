var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var mySql = require('../conf/mysqldb');

var auth = {
  loginUser: function (req, res) {

    if (!req.body || !req.body.lg_username || !req.body.lg_password
            || req.body.lg_username === '' || req.body.lg_password === '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Credenciales incorrectas"
      });
      return;
    }

    var username = req.body.lg_username;
    var password = req.body.lg_password;
    auth.validateUserPassword(username, password, res);
  },
  logoutUser: function (req, response) {
    var key = (req.cookies && req.cookies.userLoginToken &&
            req.cookies.userLoginToken.user && req.cookies.userLoginToken.user.id);
    if (!mySql || !mySql.pool) {
      response.sendStatus(500);
      //throw err;
    }
    mySql.pool.getConnection(function (err, connection) {
      if (err || !connection) {
        response.sendStatus(500);
        //throw err;
      } else {
        connection.query('UPDATE users SET status = 1 WHERE user_id  = ' + key, function (err, rows) {
        });
      }
    });
    response.clearCookie('antiCSRFToken', {path: '/'});
    //response.cookie('antiCSRFToken', '', {path: '/'});
    response.clearCookie('userLoginToken', {path: '/', httpOnly: true});
    //response.cookie('userLoginToken', '', {path: '/', httpOnly: true});
    response.redirect('/login');
  },
  validateUserPassword: function (username, password, response) {
    /*
     Content-Type: application/x-www-form-urlencoded
     Content-Length: 30
     lg_username=LAAH000000XXX&lg_password=Loshs123hugo
     */
    if (!mySql || !mySql.pool) {
      console.log('mySql: ' + mySql);
      console.log('mySql.pool: ' + mySql.pool);
      response.sendStatus(500);
      //throw err;
    }
    mySql.pool.getConnection(function (err, connection) {
      if (err || !connection) {
        console.log('err: ' + err);
        console.log('connection: ' + connection);
        response.sendStatus(500);
        //throw err;
      } else {
        connection.query('SELECT user_id, password_hash, rol, first_name, ' +
                'father_lastname FROM users WHERE user_code = '
                + mySql.pool.escape(username), function (err, rows) {
          if (err) {
             console.log('err: ' + err);
            response.sendStatus(500);
            //throw err;
          } else {
            if (rows && rows.length !== 1) {
              response.status(401);
              response.json({
                "status": 401,
                "message": "Credenciales incorrectas"
              });
              return;
            } else {
              bcrypt.compare(password, rows[0].password_hash, function (err, result) {
                if (err) {
                  response.sendStatus(500);
                  //throw err;
                } else {
                  if (result) {
                    connection.query('UPDATE users SET status = 2 WHERE user_id  = '
                            + rows[0].user_id, function (err, rowsUpdate) {
                      if (err) {
                        response.sendStatus(500);
                        //throw err;
                      } else {
                        var dbUserObj = {
                          id: rows[0].user_id, // 1
                          name: username, //'LAAH000000XXX'
                          role: rows[0].rol, //'Directivo'
                          nombre: rows[0].first_name, //'Hugo'
                          apellido: rows[0].father_lastname //'Labra'
                        };
                        var CSRFToken = secureRandomBase64(25);
                        response.cookie('antiCSRFToken', CSRFToken, {path: '/'});
                        response.cookie('userLoginToken', generateLoginToken(dbUserObj), {path: '/', httpOnly: true});
                        //response.json(generateLoginToken(dbUserObj));
                        //response.sendStatus(200);
                        if (dbUserObj.role === 'Superadmin') {
                          response.redirect('/superadmin/usuarios');
                        } else {
                          response.redirect('/director/mural');
                        }
                      }
                    });
                  } else {
                    response.status(401);
                    response.json({
                      "status": 401,
                      "message": "Credenciales incorrectas"
                    });
                    return;
                  }
                }
              });
            }
          }
          connection.release();
        });
      }
    });
  },
  validateUser: function (req, response, key, next) {

    if (!mySql || !mySql.pool) {
      response.sendStatus(500);
      //throw err;
    }
    mySql.pool.getConnection(function (err, connection) {
      if (err || !connection) {
        response.sendStatus(500);
        //throw err;
      } else {
        connection.query('SELECT user_code, rol, first_name, father_lastname FROM users WHERE user_id = '
                + mySql.pool.escape(key) + ' AND status = 2', function (err, rows) {
          if (err) {
            response.sendStatus(500);
          } else {
            if (rows && rows.length === 1) {
              var dbUserObj = {
                id: key,
                name: rows[0].user_code,
                role: rows[0].rol,
                nombre: rows[0].first_name,
                apellido: rows[0].father_lastname
              };
              if ((req.url.indexOf('superadmin') >= 0 && dbUserObj.role === 'Superadmin') ||
                      (req.url.indexOf('admin') < 0 && req.url.indexOf('/') >= 0)) {
                next();
              } else {
                response.status(403);
                response.json({
                  "status": 403,
                  "message": "Not Authorized"
                });
              }
            } else {
              response.status(401);
              response.json({
                "status": 401,
                "message": "Usuario inválido"
              });
              return;
            }
          }
          connection.release();
        });
      }
    });
  }
};


function generateLoginToken(user) {
  var expires = expiresIn(5); // 5 days
  var token = jwt.encode({
    exp: expires
  }, require('../conf/tokensSecret')());
  return {
    token: token,
    expires: expires,
    user: user
  };
}


function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}


function secureRandomBase64(len) {
  return crypto.randomBytes(Math.ceil(len * 3 / 4))
          .toString('base64')   // convert to base64 format
          .slice(0, len)        // return required number of characters
          .replace(/\+/g, '0')  // replace '+' with '0'
          .replace(/\//g, '0'); // replace '/' with '0'
}


module.exports = auth;