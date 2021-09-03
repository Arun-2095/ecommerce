const { getProductsModel, getCatagoryModel } = require('../model/productModel');

const getProducts = (req, res, next) => {
  getProductsModel(req)
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => next(err));
};

const getCatagory = (req, res, next) => {
  getCatagoryModel()
    .then((catagory) => {
      res.status(200).json(catagory);
    })
    .catch((err) => next(err));
};

module.exports = { getProducts, getCatagory };
