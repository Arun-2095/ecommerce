const { getUserCartId, addToCart, getCartItemsModel, removeCartItemModel } = require('../model/orderModel');

var orderController = {};

orderController.getUserCartId = (req, res, next) => {
  getUserCartId(req)
    .then((cartId) => {
      req.userData = { ...req.userData, ...cartId };
      next();

      // res.status(200).json(products);
    })
    .catch((err) => next(err));
};

orderController.getCartItems = (req, res, next) => {
  getCartItemsModel(req)
    .then((cartItems) => {
      res.status(200).json(cartItems);
    })
    .catch((err) => next(err));
};

orderController.addToCart = (req, res, next) => {
  addToCart(req)
    .then((cart) => {
      console.log(cart, 'CART');
      res.json({ message: 'successfully Added' });
    })
    .catch((err) => next(err));
};

orderController.removeCartItem = (req, res, next) => {
  removeCartItemModel(req)
    .then((cart) => {
      res.json({ message: 'successfully Deleted' });
    })
    .catch((err) => next(err));
};

module.exports = orderController;
