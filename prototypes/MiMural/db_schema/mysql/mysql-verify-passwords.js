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


// VERIFICAR CONTRASENA DE HUGO
var pass = 'Loshs123hugo';
connection.query("SELECT password_hash FROM users WHERE user_id = 1",
  function(err3, rows, fields) {
    if (err3) { 
      throw err3;
    }
    else {
      console.log('Hugo password hash from DB:  ', rows[0].password_hash);
      bcrypt.compare(pass, rows[0].password_hash, function(err, res) {
        if(res) {
          console.log('Hugo password match in DB: OK');
        }
        else{
          console.log('Hugo password doesnt match in DB: ERROR ------');
        }
      });
    }
});

var pass2 = 'Loshs123hug';
connection.query("SELECT password_hash FROM users WHERE user_id = 1",
  function(err3, rows, fields) {
    if (err3) { 
      throw err3;
    }
    else {
      bcrypt.compare(pass2, rows[0].password_hash, function(err, res) {
        if(res) {
          console.log('Hugo incorrect password match in DB: ERROR ------');
        }
        else{
          console.log('Hugo incorrect password doesnt match in DB: OK');
        }
      });
    }
});














// VERIFICAR CONTRASENA DE HECTOR
var passHector = 'Loshs123hector';
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
      });
    }
});

var pass2Hector = 'Loshs123hecto';
connection.query("SELECT password_hash FROM users WHERE user_id = 2",
  function(err3, rows, fields) {
    if (err3) { 
      throw err3;
    }
    else {
      bcrypt.compare(pass2Hector, rows[0].password_hash, function(err, res) {
        if(res) {
          console.log('Hector incorrect password match in DB: ERROR ------');
        }
        else{
          console.log('Hector incorrect password doesnt match in DB: OK');
        }
      });
    }
});








// VERIFICAR CONTRASENA DE GIOVANNI
var passGio = 'Loshs123gio';
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

var pass2Gio = 'Loshs123geo';
connection.query("SELECT password_hash FROM users WHERE user_id = 3",
  function(err3, rows, fields) {
    if (err3) { 
      throw err3;
    }
    else {
      bcrypt.compare(pass2Gio, rows[0].password_hash, function(err, res) {
        if(res) {
          console.log('Giovanni incorrect password match in DB: ERROR ------');
        }
        else{
          console.log('Giovanni incorrect password doesnt match in DB: OK');
        }
      });
    }
});






// VERIFICAR CONTRASENA DE KIMI
var passKimi = 'Loshs123kimi';
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
      });
    }
});

var pass2Kimi = 'Loshs123kurata';
connection.query("SELECT password_hash FROM users WHERE user_id = 4",
  function(err3, rows, fields) {
    if (err3) { 
      throw err3;
    }
    else {
      bcrypt.compare(pass2Kimi, rows[0].password_hash, function(err, res) {
        if(res) {
          console.log('Kimi incorrect password match in DB: ERROR ------');
        }
        else{
          console.log('Kimi incorrect password doesnt match in DB: OK');
        }
        connection.end();
      });
    }
});


