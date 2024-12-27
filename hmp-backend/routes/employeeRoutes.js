const express = require('express');
const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');

const router = express.Router();

// Route for creating a new employee
router.post('/', createEmployee);

// Route for fetching all employees
router.get('/', getAllEmployees);

// Route for fetching an employee by ID
router.get('/:id', getEmployeeById);

// Route for updating an employee by ID
router.put('/:id', updateEmployee);

// Route for deleting an employee by ID (mark as inactive)
router.delete('/:id', deleteEmployee);




module.exports = router;
