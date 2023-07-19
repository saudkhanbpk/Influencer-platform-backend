const express = require('express');
const router = express.Router();
const controller = require('../Controllers/controller');
const general_Information = require('../Controllers/generalController')
router.post('/register', controller.register);
router.post('/user_verify', controller.verificationAfterEmail);
router.post('/general_info', general_Information.general);

module.exports = router;
