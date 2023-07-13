const express = require('express');
const router = express.Router();
const controller = require('../Controllers/controller');

router.post('/register', controller.register);

module.exports = router;
