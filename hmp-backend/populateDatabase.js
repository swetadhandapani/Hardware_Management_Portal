const mongoose = require('mongoose');
const User = require('./models/User');
const HardwareRequest = require('./models/HardwareRequest');
const Feedback = require('./models/Feedback');

// Connect to the database
mongoose.connect('mongodb://localhost:27017/hardwarePortal')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

// Sample data
const users = [
  { name: 'Alice Johnson', email: 'alice.johnson@example.com', password: 'password123', role: 'admin' },
  { name: 'Bob Smith', email: 'bob.smith@example.com', password: 'password123', role: 'employee' },
  { name: 'Charlie Brown', email: 'charlie.brown@example.com', password: 'password123', role: 'user' },
];

// Function to populate database
const populateDatabase = async () => {
  await User.deleteMany({});

  // Insert users and retrieve their ObjectIds
  const insertedUsers = await User.insertMany(users);

  // Create hardware requests using the ObjectIds from the inserted users
  const hardwareRequests = [
    { user: insertedUsers[0]._id, description: 'Laptop won\'t start, suspect battery issue.', status: 'Pending', assignedEmployee: null },
    { user: insertedUsers[2]._id, description: 'Desktop PC running slow, needs a thorough check.', status: 'In Progress', assignedEmployee: insertedUsers[1]._id },
  ];

  // Insert hardware requests
  const insertedRequests = await HardwareRequest.insertMany(hardwareRequests);

  // Create feedbacks using the ObjectIds from the inserted users and requests
  const feedbacks = [
    { user: insertedUsers[0]._id, request: insertedRequests[0]._id, feedbackText: 'Great service! My laptop is working perfectly now.' },
  ];

  // Insert feedbacks
  await Feedback.insertMany(feedbacks);

  console.log('Database populated!');
  mongoose.connection.close();
};

populateDatabase();
