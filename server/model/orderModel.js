const sqlconnection = require("./../services/dbConnection");

const orderModel = {};

orderModel.getUserCartId = function (requestObj) {
  const { userData } = requestObj;
  return new Promise(function (resolve, reject) {
    sqlconnection.query(
      `SELECT id as cartId FROM cart WHERE user_id = ?`,
      [userData.userId],
      (error, result) => {
        if (error) {
          reject(new ServerError(400, error.message, error));
        } else {
          resolve(result[0]);
        }
      }
    );
  });
};

orderModel.addToCart = function (requestObj) {
  const { userData } = requestObj;
  return new Promise(async function (resolve, reject) {
    sqlconnection.query(
      `SELECT id as cartId FROM cart WHERE user_id = ?`,
      [userData.userId],
      async (error, result) => {
        if (error) {
          reject(new ServerError(400, error.message, error));
        } else {
          if (result.length == 0) {
            sqlconnection.query(
              `INSERT INTO cart (user_id) VALUES(?)`,
              [userData.userId],
              (err, result) => {
                if (!!result) {
                  console.log(result.insertId, result, "RESULT");
                  requestObj.cartId = result.insertId;
                  resolve(requestObj);
                } else {
                  reject(new ServerError(400, error.message, error));
                }
              }
            );
          } else {
            requestObj.cartId = result[0].cartId;
            resolve(requestObj);
          }
        }
      }
    );
  }).then((requestObj) => orderModel.insertCartItem(requestObj));
};

orderModel.insertCartItem = function (requestObj) {
  const { userData, body, cartId } = requestObj;
  const { selectedProductQuantity, selectedProductCount, selectedProductPrice, idMap } =
    body;

  let selectedProuduct = idMap[Number(selectedProductQuantity).toFixed(1)];
  console.log(
    userData.userId,
    selectedProuduct,
    selectedProductQuantity,
    cartId,
    selectedProductPrice,
    selectedProductCount,
    "product_quantity"
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
          console.log(cartId, "Inside IF");
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
    const { query } = requestObj;
    const { cart_id, product_id } = query;

    let productSet = product_id.split(",").map(Number);

    if (cart_id) {
      sqlconnection.query(
        `DELETE FROM cartItems WHERE cart_id = ? AND product_id IN ?`,
        [cart_id, [productSet]],
        function (err, result) {
          if (err) {
            console.log(err);
            reject(new ServerError(400, err.message, err));
          } else {
            resolve({ message: "successfully Item Deleted" });
          }
        }
      );
    } else {
      resolve({ message: "No CartId is given" });
    }
  });
};

orderModel.insertOrder = function (requestObj) {
  const { userData, body } = requestObj;

  const { products, selectedAddress, orderDate, cart_id } = body;

  return new Promise(async function (resolve, reject) {
    try {
      let [invoiceRow, fields] = await sqlconnection
        .promise()
        .query(
          `INSERT INTO invoice (user_id, expected_time,selected_address) VALUES(?,?,?)`,
          [userData.userId, orderDate, selectedAddress]
        );

      if (invoiceRow.insertId) {
        let orderedProduct = await products.map((product) => [
          userData.userId,
          product.product_id,
          invoiceRow.insertId,
          parseInt(product.selected_product),
        ]);

        let [row, fields] = await sqlconnection
          .promise()
          .query(
            `INSERT INTO userOrder (user_id, product_id,invoice_id,selected_quantity) VALUES ?`,
            [orderedProduct]
          );

        if (!!cart_id) {
          let cartProducts = await products
            .map((product) => product.product_id)
            .join(",");
          requestObj.query = {
            cart_id,
            product_id: cartProducts,
          };

          try {
            let cartItemRemoved = await orderModel.removeCartItemModel(requestObj);
            resolve({ message: "succesfully order placed" });
          } catch (error) {
            reject(new ServerError(400, error.message, error));
          }
        } else {
          resolve({ message: "succesfully order placed" });
        }
      }
    } catch (error) {
      reject(new ServerError(400, error.message, error));
    }
  });
};

orderModel.getOrderList = function (requestObj) {
  const { userData } = requestObj;

  return new Promise(async function (resolve, reject) {
    sqlconnection.query(
      `SELECT  
      delivery_status as orderStatus , 
      JSON_OBJECT('address', A.address , 'steet', A.street, 'phone', A.phone , "taluk", A.taluk) as Address,
      O.invoice_id as invoice,
      ordered_time,
      json_arrayagg(JSON_OBJECT('name', P.product_name , 'catagory', P.catagory , 'quantity', P.product_quantity , 'price', P.product_price, 'selectedQuantity', O.selected_quantity)) as product 
      FROM (SELECT * FROM shop.invoice where user_id = ?)Invoice 
      LEFT JOIN deliveryStatus D ON Invoice.order_status = D.id 
      LEFT JOIN userAddress A ON Invoice.selected_address = A.id 
      LEFT JOIN userOrder O ON Invoice.id = O.invoice_id 
      LEFT JOIN product P ON O.product_id = P.id group by invoice_id ;`,
      [userData.userId],
      function (err, result) {
        if (err) {
          console.log(err);
          reject(new ServerError(400, err.message, err));
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports = orderModel;
