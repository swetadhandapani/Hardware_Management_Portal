const express = require('express');
const connectDB = require('./config/db'); 
const userRoutes = require('./routes/userRoutes');
const hardwareRoutes = require('./routes/hardwareRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/authRoutes'); 
const cors = require('cors');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/hardware', hardwareRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/auth', authRoutes); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
