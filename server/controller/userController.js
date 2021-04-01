const bycrypt = require('bcrypt');
const { ERROR } = require('./../constant/appConstant');
const {RegisterForm , loginFormValidation}  = require('./../services/validation');
const sqlconnection =  require('./../services/dbConnection')
const { RegistrationModel , loginAuthenticationModel} = require('./../model/userModel');


const registerUser = (req, res, next)=>{


let { value, error} =RegisterForm.validate(req.body) 

if(error){
    let {details} = error;
    next(new ServerError(401, details[0].message, [] )); 
}else{
   
    RegistrationModel(value).then((data) => res.status(200).json(data) ).catch((err)=> next(err))

}

}


const loginUser = (req, res, next)=>{


    let { value, error }  = loginFormValidation.validate(req.body)

    if(error){
        let {details} = error;
        next(new ServerError(401, details[0].message, [] )); 
    }else{

        loginAuthenticationModel(value).then((data) =>         
        next(new ServerError(200, "successfully Logged In", data))).catch((err) => next(err))
    
    }
   
    
     
    
}



module.exports = {registerUser, loginUser}
