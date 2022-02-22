const Joi = require('joi');



const userValidation =  { 
    'ADDRESS' : Joi.object({   
    address:  Joi.object().keys({  
    name: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    street: Joi.string().required(),
    taluk: Joi.string().required(),
    city: Joi.string().required(),
    landMark: Joi.string().required(),
        })
}),
    "LOGIN": Joi.object({   
     email: Joi.string().email().required(),
    password: Joi.string().required(),
}), "REGISTER": Joi.object({
    userName : Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    confirmPassword: Joi.ref('password')
})
} 




module.exports = { userValidation  }