const Express = require('express');
const {ERROR} = require('../constant/appConstant')
const Router = Express.Router()
const connection = require('../services/dbConnection')


Router.get('/login', function(req, res , next){

  

    connection.query('SELECT * FROM `catagory`', (error, result)=>{

    console.log(error, result, "SELECTT")
    res.send({data: result})

   })
    
    // next({error:ERROR.AUTH, message:"FROM ROUTE"})
})


module.exports = Router