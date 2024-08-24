const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controllers");

// Create a new user
router.post("/create", userControllers.create);

// Login a user
router.post("/login", userControllers.login);

module.exports = router;
