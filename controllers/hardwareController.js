const HardwareRequest = require('../models/HardwareRequest');
const mongoose = require('mongoose');

exports.createRequest = async (req, res) => {
  //console.log(req.body); 
  
  const { hardware, deviceModel, contactNumber, description, userId } = req.body;
  
  if (!hardware || !deviceModel || !contactNumber || !userId) {
    return res.status(400).json({ message: "All required fields must be provided" });
  }

  try {
    const newRequest = new HardwareRequest({
      hardware,
      deviceModel,
      contactNumber,
      description,
      userId,
      status: 1
    });

    await newRequest.save();
    res.status(201).json({ message: "Hardware request created successfully", requestId: newRequest._id });
  } catch (error) {
    console.error("Error creating hardware request:", error);
    res.status(500).json({ message: "Error creating hardware request", error });
  }
};

exports.assignToEmployee = async (req, res) => {
  try {
    const { requestId, employeeId } = req.body;

    if (!requestId || !employeeId) {
      return res.status(400).json({ message: "Request ID and Employee ID are required" });
    }

    // Set status to 2 for 'In Progress'
    const updatedRequest = await HardwareRequest.findByIdAndUpdate(
      requestId,
      { assignedEmployee: employeeId, status: 2 }, // Use numeric value for 'In Progress'
      { new: true }
    ).populate('assignedEmployee', 'name');  // Populate employee's name

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error('Error assigning hardware request:', error);
    res.status(500).json({ message: 'Assignment failed' });
  }
};

exports.updateStatus = async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;

  try {
    const updatedRequest = await HardwareRequest.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json({ message: 'Status updated successfully', updatedRequest });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Failed to update status', error });
  }
};

exports.markAsCompleted = async (req, res) => {
  try {
    const { requestId } = req.body;
    const request = await HardwareRequest.findByIdAndUpdate(
      requestId,
      { status: 3 }, // Status set to "Completed"
      { new: true }
    );
    
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(request);
  } catch (err) {
    console.error('Update failed:', err);
    res.status(500).json({ message: 'Update failed' });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const requests = await HardwareRequest.find()
      .populate("userId", "name email")  
      .populate({
        path: "assignedEmployee",  
        select: "name",
      })
      .exec();
      
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Error fetching requests" });
  }
};


exports.getAssignedRequests = async (req, res) => {
  const { employeeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    return res.status(400).json({ message: 'Invalid employee ID' });
  }

  try {
    const requests = await HardwareRequest.find({ assignedEmployee: employeeId })
      .populate("assignedEmployee", "name") 
      .exec();

    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching assigned requests:', error);
    res.status(500).json({ message: 'Failed to fetch assigned requests' });
  }
};


exports.getRequestHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const requestHistory = await HardwareRequest.find({ userId })
      .populate("assignedEmployee", "name") 
      .exec();

    res.status(200).json(requestHistory);
  } catch (error) {
    console.error("Error fetching request history:", error);
    res.status(500).json({ message: "Failed to fetch request history" });
  }
};


