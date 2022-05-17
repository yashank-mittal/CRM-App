const express = require('express');
const router = express.Router();
const authController = require('../Controllers/auth.controller');
const {verifySignUp} = require('../middlewares')

/**This file will act as the routes for authentication and authorization */

//POST 127.0.0.1:8080/crm/api/v1/auth/signup
router.post('/signup',[verifySignUp.validateSignUp],authController.signup);
router.post('/signin',authController.signin);













module.exports = router;