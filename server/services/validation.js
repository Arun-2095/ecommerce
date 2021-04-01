const Joi = require('joi');


const RegisterForm  = Joi.object({
    userName : Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    confirmPassword: Joi.ref('password')
})


const loginFormValidation  = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})




module.exports = { RegisterForm , loginFormValidation }