const Joi = require('joi');

exports.UserValidation = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().alphanum().min(8).max(30).required(),
    rollNo: Joi.string().alphanum().min(8).max(30).required()
})