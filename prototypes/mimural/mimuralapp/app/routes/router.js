var express = require('express');
var router = express.Router();

var authenticator = require('../security/authenticator');
var usuarios = require('./usuarios.js');
var mural = require('./mural.js');
var external = require('./conexionExterna');
var publicaciones = require('./publicaciones');
var acciones = require('./acciones');

router.get('/', function(req, res) {
  res.redirect('/login');
});


router.post('/loginUser', authenticator.loginUser);

router.post('/logoutUser', authenticator.logoutUser);
router.get('/logoutUser', authenticator.logoutUser);

// Test
router.get('/usuarios', usuarios.all);
router.get('/mural', mural.all);
router.get('/datospublicos', external.publicDataPlanea);
router.get('/publicaciones', publicaciones.all);
router.get('/publicaciones/nueva', publicaciones.new);
router.post('/publicaciones/nueva', publicaciones.new);
router.get('/acciones', acciones.all);
// End test

router.get('/rest/superadmin/usuarios', usuarios.all);
//router.post('/rest/superadmin/usuario/:id', usuarios.new);
//router.delete('/rest/superadmin/usuario/:id', usuarios.delete);
router.get('/rest/superadmin/rest/publicaciones/:escuelacct', publicaciones.all);

router.post('/rest/publicaciones/nueva', publicaciones.new);
router.get('/rest/mural/:escuelacct', mural.getPostsMySQL);

router.get('/rest/datospublicos', external.publicDataPlanea);

//router.get('/publicaciones/rest/nueva', publicaciones.new);

module.exports = router;