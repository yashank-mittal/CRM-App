/**
 * Define the routes for the User resorce
 */
const express = require('express')
const router = express.Router();
const userController = require('../Controllers/user.controller');
const { authJwt } = require('../middlewares')

    /**
 * Get 127.0.0.1:8080/crm/api/v1/users/
 */

router.get('/users',[authJwt.verifyToken , authJwt.isAdmin],userController.findAllUsers);

/**
 * GET  127.0.0.1:8080/crm/api/v1/user/:userId
 */

router.get('/users/:userId',[authJwt.verifyToken],userController.findUserById);

/**
 * PUT  127.0.0.1:8080/crm/api/v1/user/:userId
 */

router.put('/users/:userId',[authJwt.verifyToken,authJwt.isAdmin],userController.updateUser)

module.exports = router;