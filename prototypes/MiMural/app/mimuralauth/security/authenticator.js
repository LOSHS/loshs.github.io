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
        "message": "Invalid credentials"
      });
      return;
    }

    var username = req.body.lg_username;
    var password = req.body.lg_password;

    auth.validateUserPassword(username, password, res);
  },
  validateUserPassword: function (username, password, response) {
    /*
     Content-Type: application/x-www-form-urlencoded
     Content-Length: 30
     lg_username=LAAH000000XXX&lg_password=Loshs123hugo
     */
    if (!mySql || !mySql.pool) {
      response.sendStatus(500);
      //throw err;
    }
    mySql.pool.getConnection(function (err, connection) {
      if (err || !connection) {
        response.sendStatus(500);
        //throw err;
      } else {
        connection.query('SELECT user_id, password_hash, rol, first_name, father_lastname FROM users WHERE user_code = '
                + mySql.pool.escape(username), function (err, rows) {
          if (err) {
            response.sendStatus(500);
            //throw err;
          } else {
            if (rows && rows.length !== 1) {
              console.log('El usuario ' + username + ' no existe');
              console.log('');
              response.status(401);
              response.json({
                "status": 401,
                "message": "Invalid credentials"
              });
              return;
            } else {
              console.log('Usuario ' + username + ' encontrado');
              bcrypt.compare(password, rows[0].password_hash, function (err, result) {
                if (err) {
                  response.sendStatus(500);
                  //throw err;
                }
                if (result) {
                  console.log('Contrasena correcta');
                  console.log('');
                  var dbUserObj = {
                    id: rows[0].user_id, // 1
                    name: username, //'LAAH000000XXX'
                    role: rows[0].rol, //'Directivo'
                    nombre: rows[0].first_name, //'Hugo'
                    apellido: rows[0].father_lastname //'Labra'
                  };
                  var CSRFToken = secureRandomBase64(25);
                  response.cookie('AntiCSRFToken', CSRFToken, {path: '/'});
                  response.json(generateLoginToken(dbUserObj));
                } else {
                  console.log('Contrasena incorrecta');
                  console.log('');
                  response.status(401);
                  response.json({
                    "status": 401,
                    "message": "Invalid credentials"
                  });
                  return;
                }
              });
            }
          }
          connection.release();
        });
      }
    });






  },
  validateUser: function (username) {
    var dbUserObj = {
      id: 1,
      name: 'LAAH000000XXX',
      role: 'Directivo',
      nombre: 'Hugo',
      apellido: 'Labra'
    };
    return dbUserObj;
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