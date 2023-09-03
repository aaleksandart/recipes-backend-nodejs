const express = require("express");
const router = express.Router();
const controller = require("../controllers/UsersController");

//Get all users
router.get("/", controller.getAllUsers);
//Get one user
router.get("/:id", controller.getUserById);
//Create new user
router.post("/", controller.createUser);
//Update user
router.patch("/:id", controller.updateUser);
//Delete user
router.delete("/:id", controller.deleteUser);

module.exports = router;