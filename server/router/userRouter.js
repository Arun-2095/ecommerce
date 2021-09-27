const Express = require('express');
const Router = Express.Router();
const userController = require('../controller/userController');
const authController = require('../controller/authController');
const orderController = require('../controller/orderController');

Router.post('/register', userController.registerUser);

Router.post('/login', userController.loginUser, authController.generateWebToken);

Router.get('/getUserDetail', authController.validateWebToken, userController.getUserDetail);

module.exports = Router;
