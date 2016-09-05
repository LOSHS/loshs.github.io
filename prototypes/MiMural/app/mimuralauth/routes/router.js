var express = require('express');
var router = express.Router();

var authenticator = require('../security/authenticator');
var usuarios = require('./usuarios.js');
var mural = require('./mural.js');

router.post('/loginUser', authenticator.loginUser);

router.post('/logoutUser', authenticator.logoutUser);
router.get('/logoutUser', authenticator.logoutUser);

// Test
router.get('/usuarios', usuarios.all);
router.get('/mural', mural.all);
// End test

router.get('/superadmin/rest/usuarios', usuarios.all);
//router.post('/superadmin/rest/usuario/', usuarios.new);
//router.delete('/superadmin/rest/usuario/:id', usuarios.delete);

router.get('/director/rest/mural', mural.all);

module.exports = router;