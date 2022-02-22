const Express = require('express');
const Router = Express.Router();
const {validateMiddleware} = require('../middleware/validator/validate')

const userController = require('../controller/userController');
const authController = require('../controller/authController');
const orderController = require('../controller/orderController');

Router.post('/register', validateMiddleware('REGISTER'), userController.registerUser);

Router.post('/login',validateMiddleware('LOGIN'), userController.loginUser, authController.generateWebToken);

Router.get('/getUserDetail', authController.validateWebToken, userController.getUserDetail);

Router.post('/add-address', authController.validateWebToken, validateMiddleware('ADDRESS'), userController.addAddress);

module.exports = Router;
