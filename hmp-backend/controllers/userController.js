const User = require("../models/User");
const bcrypt = require("bcryptjs");
// Function to register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to get all users (filtering by employee role)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "employee" });  // No filtering for 'status' here
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Function to get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //console.log("User data:", user);  
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

// Function to update a user by ID
exports.updateUser = async (req, res) => {
  const { name, email, role, password } = req.body;

  try {
    // Find the user to be updated
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update other user fields (name, email, role) if provided
    user.name = name || user.name;
    user.email = email || user.email;
    //user.role = role || user.role;

    // Check if the provided password is different from the stored one
    /*if (password && !(await bcrypt.compare(password, user.password))) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }*/

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to mark a user as inactive instead of deleting
exports.deleteUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { status: "inactive" },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User marked as inactive successfully" });
  } catch (err) {
    console.error("Error marking user as inactive:", err);
    res.status(500).json({ message: "Error marking user as inactive" });
  }
};


exports.getUser = async (req, res) => {
  try {
    // Verify the token from the request header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId; 

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

