const express = require('express');
const {
  createFeedback,
  getFeedbackById,
  getAllFeedback,
  deleteFeedback,
  getEmployeeFeedbacks
} = require('../controllers/feedbackController');
//const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router();

// Route for creating new feedback
router.post('/', createFeedback);

// Route for fetching all feedback
router.get('/', getAllFeedback);

// Route for fetching feedback for a particular employee (based on employee ID)
router.get('/employee/:employeeId', getEmployeeFeedbacks);



// Route for fetching feedback by ID
router.get('/:id', getFeedbackById);

// Route for deleting feedback by ID
router.delete('/:id', deleteFeedback);

module.exports = router;
