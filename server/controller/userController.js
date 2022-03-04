

const {RegisterForm , }  = require('./../services/validation');

const { RegistrationModel , loginAuthenticationModel , getUserDetailModel ,addUserAddress , getUserAddressModel} = require('./../model/userModel');

const registerUser = (req, res, next)=>{
    RegistrationModel(req.body).then((data) => res.status(200).json(data) ).catch((err)=> next(err))
}


const loginUser = (req, res, next)=>{
  
        loginAuthenticationModel(req.body).then((data) => {             
            req.userData = data;
            next();
        }).catch((err) => next(err))

}

const getUserDetail = (req, res, next)=>{

    let {userData ={}}= req
    getUserDetailModel(userData).then((userDetail)=>{
       res.status(200).json(userDetail) 
    }).catch(err => next(err))
               
}

const addAddress = (req, res, next)=>{
     
    console.log(req.body,req.userData,"req.body")
     let requestObject  = {
         user_id : req.userData?.userId,
         ...req.body?.address
     }
    
    addUserAddress(requestObject).then((userDetail)=>{
       res.status(200).json(userDetail) 
    }).catch(err => next(err))  
               
}


const getUserAddress = (req, res, next)=>{
     
     let requestObject  = {
         user_id : req.userData?.userId,
     }
    getUserAddressModel(requestObject).then((userDetail)=>{
       res.status(200).json(userDetail) 
    }).catch(err => next(err))  
               
}



module.exports = {registerUser, loginUser , getUserDetail ,addAddress , getUserAddress}
