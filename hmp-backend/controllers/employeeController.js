const bcrypt = require('bcryptjs');
const User = require('../models/User'); 
const mongoose = require('mongoose');

const createEmployee = async (req, res) => {
  const { name, email, password, role = 'employee' } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Employee already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      status: 'active', // Default status for new employees
    });

    await user.save();

    res.status(201).json({ message: 'Employee created successfully', user });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: 'employee', status: 'active' }); 
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees' });
  }
};

const getEmployeeById = async (req, res) => {
  const employeeId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    return res.status(400).json({ message: 'Invalid employee ID format' });
  }

  try {
    const employee = await User.findById(employeeId);
    if (!employee || employee.role !== 'employee') {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee', error: error.message });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const employee = await User.findById(id);
    if (!employee || employee.role !== 'employee') {
      return res.status(404).json({ message: 'Employee not found' });
    }

    employee.name = name || employee.name;
    employee.email = email || employee.email;
    if (password) {
      employee.password = await bcrypt.hash(password, 10);
    }

    await employee.save();
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await User.findOneAndUpdate(
      { _id: id, role: 'employee' },
      { status: 'inactive' },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee marked as inactive successfully', employee });
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error });
  }
};

module.exports = { 
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
