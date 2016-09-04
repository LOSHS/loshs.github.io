var express = require('express');
var router = express.Router();

var authenticator = require('../security/authenticator');

router.post('/loginUser', authenticator.loginUser);

router.post('/logoutUser', authenticator.logoutUser);
router.get('/logoutUser', authenticator.logoutUser);

module.exports = router;