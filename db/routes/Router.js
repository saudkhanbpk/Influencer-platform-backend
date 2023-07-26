const express = require('express');
const router = express.Router();
const controller = require('../Controllers/controller');
const general_Information = require('../Controllers/generalController');
const LoginController = require('../Controllers/LoginController');
const Companycontroller = require('../Controllers/companyController');
const Socialcontroller = require('../Controllers/socialController');
const stripeController = require('../Controllers/stripeController');
const uploadPhoto = require('../utils/UploadImage');

router.post('/register', controller.register);
router.get('/register', controller.getAllUsers); // Added the GET API to retrieve all users
router.post('/login', LoginController.signin);
router.post('/user_verify', controller.verificationAfterEmail);
router.post('/resend_verify', controller.resendVerification);
router.post('/general_info', general_Information.general);
router.post('/company_info', Companycontroller.company);
router.post('/social_handle', Socialcontroller.social);
router.post('/payment', stripeController.handlePayment);

//company route
router.get('/company', Companycontroller.getCompany);
router.get('/company/:id', Companycontroller.getCompanyById);
router.delete('/company/:id', Companycontroller.deleteCompany);
router.put('/company/:id', Companycontroller.updateCompany);

//social route
router.get('/social', Socialcontroller.getSocial);
router.post('/social/:id', Socialcontroller.getSocialById);
router.delete('/social/:id', Socialcontroller.deleteSocial);
router.put('/social/:id', Socialcontroller.updateSocial);

//general route
router.get('/general', general_Information.getGeneral);
router.get('/general/:id', general_Information.getGeneralById);
router.delete('/general/:id', general_Information.deleteGeneral);
router.put('/general/:id', general_Information.updateGeneral);

//update api for account management
router.put('/update/:_id', controller.updateGeneral);
router.put('/updateBillingDetails/:_id', controller.updateBillingDetails);
//update user Account Notification
router.put('/updateNotification/:_id', controller.updateUserAccountNotifications);
//update user account members
router.put('/updateMembers/:_id', controller.updateUserAccountMembers);

//update user profile
router.put('/updateProfile/:_id', uploadPhoto.single("image"), controller.userProfile);

module.exports = router;
