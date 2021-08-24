

const {RegisterForm , loginFormValidation}  = require('./../services/validation');

const { RegistrationModel , loginAuthenticationModel , getUserDetailModel} = require('./../model/userModel');

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
        loginAuthenticationModel(value).then((data) => { 
            
            req.userData = data;
            next();
          
        }).catch((err) => next(err))
    }
        
}

const getUserDetail = (req, res, next)=>{

    let {userData ={}}= req
    getUserDetailModel(userData).then((userDetail)=>{
       res.status(200).json(userDetail) 
    }).catch(err => next(err))
               
}


module.exports = {registerUser, loginUser , getUserDetail}
