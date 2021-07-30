var jwt = require('jsonwebtoken');


function generateWebToken(req, res,next) {

    let {userData}  = req;

    jwt.sign(userData, process.env.JWT_SECRET_KEY, function(err, token){
       
        if(err){
            next(new ServerError(401, 'token mechanism failed', [] ))
        } else {
            res.status(200).json({token})
        }
       
    })
   
}


function validateWebToken(req, res, next){

    let tokenHeader = req.headers['authorization'] ?? ''

    let token = tokenHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY,function(err, userData) {
         if(err){
           next(new ServerError(401, "Invalid Token", [] ));
         }else{
            req.userData = userData;
           next()
         }
      } )
}

module.exports = {generateWebToken , validateWebToken}