var express = require('express');
var router = express.Router();

var authenticator = require('../security/authenticator');

router.post('/loginUser', authenticator.loginUser);

module.exports = router;