const sqlconnection = require('./../services/dbConnection');

const orderModel = {};

orderModel.getUserCartId = function (requestObj) {
  const { userData } = requestObj;
  return new Promise(function (resolve, reject) {
    sqlconnection.query(`SELECT id as cartId FROM cart WHERE user_id = ${userData.userId}`, (error, result) => {
      if (error) {
        reject(new ServerError(400, error.message, error));
      } else {
        resolve(result);
      }
    });
  });
};

orderModel.addToCart = function (requestObj) {
  const { userData } = requestObj;
  return new Promise(function (resolve, reject) {
    sqlconnection.query(`SELECT id as cartId FROM cart WHERE user_id = ${userData.userId}`, (error, result) => {
      if (error) {
        reject(new ServerError(400, error.message, error));
      } else {
        if (result.length) {
          sqlconnection.query(`INSERT INTO cart VALUES(user_id, total)`);
        } else {
        }
      }
    });
  });
};

module.exports = orderModel;
