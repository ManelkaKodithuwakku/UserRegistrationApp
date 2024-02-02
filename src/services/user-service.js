const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const validateSignup = (data) => {
    const schema = joi.object({
        username: joi.string().required().label('Username'),
        email: joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label('Password'),
    })

    return schema.validate(data)
}

const validateLogin = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label('Password'),
    })

    return schema.validate(data)
}

module.exports = {validateSignup, validateLogin}