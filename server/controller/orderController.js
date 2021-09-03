const { getUserCartId } = require('../model/orderModel');

var orderController = {};

orderController.getUserCartId = (req, res, next) => {
  getUserCartId(req)
    .then((cartId) => {
      console.log(cartId, req.userData, 'TEST ID');
      next();

      // res.status(200).json(products);
    })
    .catch((err) => next(err));
};

orderController.getCartItems = (req, res, next) => {
  getProductsModel(req)
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => next(err));
};

orderController.addToCart = (req, res, next) => {};

module.exports = orderController;
