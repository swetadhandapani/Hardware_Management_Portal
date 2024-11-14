const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const Employee = require('../models/Employee'); 
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

// Configure nodemailer to use Mailtrap
const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525, 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

// Generate password reset token
const generateResetToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};


// Forgot password route
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found with email:', email);
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a reset token
    const token = generateResetToken(user._id);
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`; 

    // Send email with reset link
    const mailOptions = {
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`, // Updated from field
      to: email,
      subject: 'Password Reset Request',
      html: `<p>Hi ${user.name},</p>
             <p>We received a request to reset your password. Click the link below to reset it:</p>
             <a href="${resetLink}">${resetLink}</a>
             <p>If you did not request this, please ignore this email.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Reset link sent to your email' });
  } catch (error) {
    console.error('Error sending reset link:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});


// Login route for all users (admin, employee, user)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
      token,
    });
    
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Find the user and update the password
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // You might want to use a hashing function for the password
    user.password = password; 
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});


module.exports = router;
