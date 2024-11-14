const express = require('express');
const router = express.Router();
const HardwareRequest = require('../models/HardwareRequest');
const { createRequest, assignToEmployee, updateStatus, markAsCompleted, getRequests, getAssignedRequests, getRequestHistory } = require('../controllers/hardwareController');

// Route to assign employee to a request
router.post('/assign', assignToEmployee);

// Route to create a new request (using controller function)
router.post('/create', createRequest);

// Route to update the status of a request
router.put('/updateStatus/:requestId', updateStatus);

// Route to mark request as completed
router.post('/complete', markAsCompleted);

// Route to fetch all hardware requests
router.get('/requests', getRequests);

// Route to fetch assigned requests for a specific employee
router.get('/requests/assigned/:employeeId', getAssignedRequests);

// Route to fetch the history of requests for a specific user
router.get('/history/:userId', getRequestHistory); // Use the controller function to handle this

// Route to delete a request
router.delete('/delete/:requestId', async (req, res) => {
  const { requestId } = req.params;

  try {
    const request = await HardwareRequest.findByIdAndDelete(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting request', error });
  }
});

module.exports = router;
