const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUser,
} = require("../controllers/userController");

const router = express.Router();

// Route for registering a new user
router.post("/register", registerUser);

// Route for fetching all users
router.get("/", getAllUsers);

// Route for fetching a user by ID
router.get("/:id", getUserById);

// Route for updating a user by ID
router.put("/:id", updateUser);

// Route for marking a user as inactive by ID
router.put("/:id/status", deleteUser);

// Route for deleting a user by ID
router.delete("/:id", deleteUser);

router.get("/:id", getUser);

module.exports = router;
