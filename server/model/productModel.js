const sqlconnection =  require('./../services/dbConnection');



function getProductsModel(userData ={}) {
    


  return   new Promise((resolve, reject)=> {
        

        sqlconnection.query(`SELECT id, product_name,catagory ,JSON_ARRAYAGG(product_quantity) as quantities , JSON_OBJECTAGG(product_quantity,product_price) as prices FROM shop.product GROUP BY (product_name)`, (error, result)=>{

            if(error){
                reject(new ServerError(400, error.message ,  error))
            } else {
                resolve(result)
            }
          
        });
        
    })
    

}

function getCatagoryModel() {
    
    return   new Promise((resolve, reject)=> {
            
          sqlconnection.query(`SELECT id, catagory_name as catagory FROM catagory`, (error, result)=>{

              if(error){
                  reject(new ServerError(400, error.message ,  error))
              } else {
                  resolve(result)
              }
            
          });
          
      })
      
  
  }

module.exports = {getProductsModel, getCatagoryModel}