var crypto = require('crypto');
var mysql      = require('mysql');
var bcrypt = require('bcrypt');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'loshs123',
  database : 'mi_mural'
});

connection.connect();


const saltRounds = 10;

// GUARDAR CONTRASENA DE HUGO
var passHugo = 'Loshs123hugo';
bcrypt.hash(passHugo, saltRounds, function(err, hash) {
  console.log('Hugo password: ' + passHugo);
  console.log('Hugo hashed password: ' + hash);
  connection.query("UPDATE users SET password_hash = '" + hash + "' WHERE user_id = 1",
    function(err2, rows, fields) {
      if (err2) { 
        throw err2;
      }
      else {
        connection.query("SELECT password_hash FROM users WHERE user_id = 1",
          function(err3, rows, fields) {
            if (err3) { 
              throw err3;
            }
            else {
              console.log('Hugo password hash from DB:  ', rows[0].password_hash);
              bcrypt.compare(passHugo, rows[0].password_hash, function(err, res) {
                if(res) {
                  console.log('Hugo password match in DB: OK');
                }
                else{
                  console.log('Hugo password doesnt match in DB: ERROR ------');
                }
                //connection.end();
              });
            }
        });
        
      }
  });
});





// GUARDAR CONTRASENA DE HECTOR
var passHector = 'Loshs123hector';
bcrypt.hash(passHector, saltRounds, function(err, hash) {
  console.log('Hector password: ' + passHector);
  console.log('Hector hashed password: ' + hash);
  connection.query("UPDATE users SET password_hash = '" + hash + "' WHERE user_id = 2",
    function(err2, rows, fields) {
      if (err2) { 
        throw err2;
      }
      else {
        connection.query("SELECT password_hash FROM users WHERE user_id = 2",
          function(err3, rows, fields) {
            if (err3) { 
              throw err3;
            }
            else {
              console.log('Hector password hash from DB:  ', rows[0].password_hash);
              bcrypt.compare(passHector, rows[0].password_hash, function(err, res) {
                if(res) {
                  console.log('Hector password match in DB: OK');
                }
                else{
                  console.log('Hector password doesnt match in DB: ERROR ------');
                }
                //connection.end();
              });
            }
        });
        
      }
  });
});






// GUARDAR CONTRASENA DE GIOVANNI
var passGio = 'Loshs123gio';
bcrypt.hash(passGio, saltRounds, function(err, hash) {
  console.log('Giovanni password: ' + passGio);
  console.log('Giovanni hashed password: ' + hash);
  connection.query("UPDATE users SET password_hash = '" + hash + "' WHERE user_id = 3",
    function(err2, rows, fields) {
      if (err2) { 
        throw err2;
      }
      else {
        connection.query("SELECT password_hash FROM users WHERE user_id = 3",
          function(err3, rows, fields) {
            if (err3) { 
              throw err3;
            }
            else {
              console.log('Giovanni password hash from DB:  ', rows[0].password_hash);
              bcrypt.compare(passGio, rows[0].password_hash, function(err, res) {
                if(res) {
                  console.log('Giovanni password match in DB: OK');
                }
                else{
                  console.log('Giovanni password doesnt match in DB: ERROR ------');
                }
              });
            }
        });
        
      }
  });
});












// GUARDAR CONTRASENA DE KIMI
var passKimi = 'Loshs123kimi';
bcrypt.hash(passKimi, saltRounds, function(err, hash) {
  console.log('Kimi password: ' + passKimi);
  console.log('Kimi hashed password: ' + hash);
  connection.query("UPDATE users SET password_hash = '" + hash + "' WHERE user_id = 4",
    function(err2, rows, fields) {
      if (err2) { 
        throw err2;
      }
      else {
        connection.query("SELECT password_hash FROM users WHERE user_id = 4",
          function(err3, rows, fields) {
            if (err3) { 
              throw err3;
            }
            else {
              console.log('Kimi password hash from DB:  ', rows[0].password_hash);
              bcrypt.compare(passKimi, rows[0].password_hash, function(err, res) {
                if(res) {
                  console.log('Kimi password match in DB: OK');
                }
                else{
                  console.log('Kimi password doesnt match in DB: ERROR ------');
                }
                connection.end();
              });
            }
        });
        
      }
  });
});





