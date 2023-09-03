//Http-errors and mongoose module
const createError = require("http-errors");
const mongoose = require("mongoose");
//Joi authschema and Mongoose user model
const { authSchema } = require("../helpers/UserValidationSchema");
const User = require("../models/UserModel");

//Error text variables
const notFoundErrorText = "User does not exist.";
const userIdErrorText = "User id is not valid.";

//USERS CONTROLLER
//Get all users
const getAllUsers = async (req, res, next) => {
    try {
        const results = await User.find({}, { __v: 0 });
        res.send(results);
    } catch (error) {
        console.log(error);
    };
}
//Get one user by id
const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await User.findById(id, { __v: 0 });
        //Handling not found error
        if (!result) {
            throw createError(404, notFoundErrorText);
        }
        res.send(result);
    } catch (error) {
        //Handling id specific and general errors
        if (error instanceof mongoose.CastError) {
            return next(createError(400, userIdErrorText));
        }
        next(error);
    };
}
//Create a new user
const createUser = async (req, res, next) => {
    try {
        //Validating input before db call
        const validation = authSchema.validate(req.body);
        if (validation.error) return next(createError(400, validation.error.details[0].message));
        //Creating new user and saving in db
        const user = new User(req.body);
        const result = await user.save();
        res.send(result);
    } catch (error) {
        //Handling input specific and general error
        if (error.name === "ValidationError") return next(createError(422, error.message));
        next(error);
    }
}
//Update existing user
const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const options = { new: true, projection: { __v: 0 } };

        const result = await User.findByIdAndUpdate(id, updates, options);
        //Handling not found error
        if (!result) {
            throw createError(404, notFoundErrorText)
        }
        res.send(result);
    } catch (error) {
        //Handling id specific and general error
        if (error instanceof mongoose.CastError) {
            return next(createError(400, userIdErrorText));
        }
        next(error);
    }
}
//Delete user
const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await User.findByIdAndDelete(id, {}, { __v: 0 });
        //Handling not found error
        if (!result) {
            throw createError(404, "User does not exist.");
        }
        res.send(result);
    } catch (error) {
        //Handling id specific and general error
        if (error instanceof mongoose.CastError) {
            next(createError(400, "User id is not valid."))
            return;
        }
        next(error);
    }
}
//Exporting all the controller methods
module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};