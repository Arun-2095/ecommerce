const sqlconnection = require('./../services/dbConnection');

function getProductsModel(requestObj) {
  const { catagory = [] } = requestObj.body;
  let query = '';
  if (catagory.length) {
    query = `SELECT id, product_name,catagory ,JSON_ARRAYAGG(product_quantity) as quantities , JSON_OBJECTAGG(product_quantity,product_price) as prices ,JSON_OBJECTAGG(product_quantity,id) as idMap FROM shop.product WHERE Catagory in(?) GROUP BY (product_name)`;
  } else {
    query = `SELECT id, product_name,catagory ,JSON_ARRAYAGG(product_quantity) as quantities , JSON_OBJECTAGG(product_quantity,product_price) as prices ,JSON_OBJECTAGG(product_quantity,id) as idMap FROM shop.product GROUP BY (product_name)`;
  }

  return new Promise((resolve, reject) => {
    sqlconnection.query(query, catagory, (error, result) => {
      if (error) {
        reject(new ServerError(400, error.message, error));
      } else {
        resolve(result);
      }
    });
  });
}

function getCatagoryModel() {
  return new Promise((resolve, reject) => {
    sqlconnection.query(`SELECT id, catagory_name as catagory FROM catagory`, (error, result) => {
      if (error) {
        reject(new ServerError(400, error.message, error));
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = { getProductsModel, getCatagoryModel };
