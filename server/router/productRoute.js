const Express = require('express');
const ProductRouter = Express.Router();
const ProductController = require('../controller/productController');
const authController = require('../controller/authController');

ProductRouter.get('/catagory', authController.validateWebToken, ProductController.getCatagory);

ProductRouter.post('/', authController.validateWebToken, ProductController.getProducts);

module.exports = ProductRouter;
