const sqlconnection = require('./../services/dbConnection');

const orderModel = {};

orderModel.getUserCartId = function (requestObj) {
  const { userData } = requestObj;
  return new Promise(function (resolve, reject) {
    sqlconnection.query(`SELECT id as cartId FROM cart WHERE user_id = ?`, [userData.userId], (error, result) => {
      if (error) {
        reject(new ServerError(400, error.message, error));
      } else {
        resolve(result[0]);
      }
    });
  });
};

orderModel.addToCart = function (requestObj) {
  const { userData } = requestObj;
  return new Promise(async function (resolve, reject) {
    sqlconnection.query(`SELECT id as cartId FROM cart WHERE user_id = ?`, [userData.userId], async (error, result) => {
      if (error) {
        reject(new ServerError(400, error.message, error));
      } else {
        if (result.length == 0) {
          sqlconnection.query(`INSERT INTO cart (user_id) VALUES(?)`, [userData.userId], (err, result) => {
            if (!!result) {
              console.log(result.insertId, result, 'RESULT');
              requestObj.cartId = result.insertId;
              resolve(requestObj);
            } else {
              reject(new ServerError(400, error.message, error));
            }
          });
        } else {
          requestObj.cartId = result[0].cartId;
          resolve(requestObj);
        }
      }
    });
  }).then((requestObj) => orderModel.insertCartItem(requestObj));
};

orderModel.insertCartItem = function (requestObj) {
  const { userData, body, cartId } = requestObj;
  const { selectedProductQuantity, selectedProductCount, selectedProductPrice, idMap } = body;

  let selectedProuduct = idMap[Number(selectedProductQuantity).toFixed(1)];
  console.log(
    userData.userId,
    selectedProuduct,
    selectedProductQuantity,
    cartId,
    selectedProductPrice,
    selectedProductCount,
    'product_quantity'
  );
  return new Promise((resolve, reject) => {
    sqlconnection.query(
      `INSERT INTO cartItems (user_id, product_id, cart_id, selected_quantity) VALUES( ?,?,?,?)`,
      [userData.userId, selectedProuduct, cartId, selectedProductCount],
      function (error, result) {
        if (error) {
          reject(new ServerError(400, error.message, error));
        } else {
          resolve(result);
        }
      }
    );
  });
};

orderModel.getCartItemsModel = function (requestObj) {
  return new Promise(function (resolve, reject) {
    orderModel
      .getUserCartId(requestObj)
      .then((cartId) => {
        if (cartId) {
          console.log(cartId, 'Inside IF');
          sqlconnection.query(
            `SELECT  product_name, product_price , product_quantity , product_id ,selected_product , catagory , selected_product*product_price as price  from  
          product JOIN (SELECT product_id, sum(selected_quantity) as selected_product FROM cartItems WHERE cart_id =? group by(product_id))userCartItem
          ON product.id = userCartItem.product_id`,
            [cartId.cartId],
            function (err, result) {
              if (err) {
                console.log(err);
                reject(new ServerError(400, err.message, err));
              } else {
                resolve({ cartId: cartId.cartId, cartItems: result });
              }
            }
          );
        } else {
          resolve({ cartId: null, cartItems: [] });
        }
        console.log(cartId);
      })
      .catch((err) => reject(new ServerError(400, error.message, error)));
  });
};

orderModel.removeCartItemModel = function (requestObj) {
  return new Promise(function (resolve, reject) {
    const { body, query } = requestObj;
    const { cart_id, product_id } = query;
    console.log(query, 'PARAMS');
    if (cart_id) {
      sqlconnection.query(
        `DELETE FROM cartItems WHERE product_id= ? AND cart_id = ?`,
        [product_id, cart_id],
        function (err, result) {
          if (err) {
            console.log(err);
            reject(new ServerError(400, err.message, err));
          } else {
            resolve({ message: 'successfully Item Deleted' });
          }
        }
      );
    } else {
      resolve({ message: 'No CartId is given' });
    }
  });
};

module.exports = orderModel;
