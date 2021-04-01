const Express = require('express');
const {ERROR} = require('../constant/appConstant')
const Router = Express.Router()
const userController = require('../controller/userController')
const connection = require('../services/dbConnection')


Router.post('/register',userController.registerUser)


Router.post('/login',userController.loginUser)


module.exports = Router