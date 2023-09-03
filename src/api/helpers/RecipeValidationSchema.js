const Joi = require("joi");

const authSchema = Joi.object({
    // username: Joi.string().email().required(),
    // name: Joi.string().min(2).required(),
    // age: Joi.number().required()
});

module.exports = {
    authSchema,
}