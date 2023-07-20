const express = require('express');
const router = express.Router();
const controller = require('../Controllers/controller');
const general_Information = require('../Controllers/generalController');
const LoginController = require('../Controllers/LoginController');
const Companycontroller = require('../Controllers/companyController');
const Socialcontroller = require('../Controllers/socialController');
router.post('/register', controller.register);
router.post('/login', LoginController.signin)
router.post('/user_verify', controller.verificationAfterEmail);
router.post('/general_info', general_Information.general);
router.post('/company_info', Companycontroller.company);
router.post('/social_handle', Socialcontroller.social);

module.exports = router;
