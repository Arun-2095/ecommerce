const OrderRouter = require('express').Router();
const OrderController = require('../controller/orderController');
const AuthController = require('../controller/authController');

OrderRouter.post('/addtoCart', AuthController.validateWebToken, OrderController.addToCart);

module.exports = OrderRouter;
