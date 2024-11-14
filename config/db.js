const mongoose = require('mongoose');

// MongoDB connection URL
const mongoURI = 'mongodb://localhost:27017/hardwarePortal'; 

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1); 
  }
};

// Export the connectDB function
module.exports = connectDB;
