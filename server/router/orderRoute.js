const OrderRouter = require("express").Router();
const OrderController = require("../controller/orderController");
const AuthController = require("../controller/authController");

OrderRouter.post(
  "/add-to-cart",
  AuthController.validateWebToken,
  OrderController.addToCart
);
OrderRouter.delete(
  "/add-to-cart",
  AuthController.validateWebToken,
  OrderController.removeCartItem
);
OrderRouter.get(
  "/get-cart-items",
  AuthController.validateWebToken,
  OrderController.getCartItems
);

OrderRouter.post("/create", AuthController.validateWebToken, OrderController.placeOrder);

module.exports = OrderRouter;
