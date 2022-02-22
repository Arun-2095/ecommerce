
const {userValidation} = require('./userValidation')

module.exports.validateMiddleware = function(validation ) {
  
  return function (req,res,next){

  
    let { value, error }  =  userValidation[validation]?.validate(req.body) 

    if(error){
        let {details} = error;
        next(new ServerError(400, details[0].message, [] )); 
    }else{
         next()
    }

  }

}