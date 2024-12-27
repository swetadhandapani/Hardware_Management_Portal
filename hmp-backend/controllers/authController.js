const User = require('../models/User'); 
const Employee = require('../models/Employee'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

// Login for user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    // If user not found, check if it's an employee
    if (!user) {
      const employee = await Employee.findOne({ email });
      if (!employee) {
        return res.status(404).json({ message: 'User or Employee not found' });
      }

      // Check password for employee
      const isMatch = await bcrypt.compare(password, employee.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate a token or handle login success logic for employee
      const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token, user: { id: employee._id, email: employee.email, role: 'employee' } });
    }

    // If a user is found, check the password
    if (!(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Return user data including role
    res.json({ id: user._id, email: user.email, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
