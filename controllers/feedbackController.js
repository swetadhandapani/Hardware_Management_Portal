const Feedback = require('../models/Feedback');
const HardwareRequest = require('../models/HardwareRequest');

// Create Feedback
exports.createFeedback = async (req, res) => {
  const { feedbackText, userId, requestId, email, rating } = req.body;

  if (!feedbackText || !userId || !requestId || !email || !rating) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const parsedRating = parseInt(rating, 10);
  if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
    return res.status(400).json({ message: 'Rating must be a number between 1 and 5' });
  }

  try {
    const newFeedback = new Feedback({
      feedbackText,
      userId,
      requestId,
      email,
      rating: parsedRating,
    });

    await newFeedback.save();

    const updatedRequest = await HardwareRequest.findByIdAndUpdate(
      requestId, 
      { feedbackSubmitted: true },
      { new: true }
    );

    res.status(201).json({ newFeedback, updatedRequest });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ message: 'Error saving feedback' });
  }
};



// Get Feedback by ID
exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json(feedback);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching feedback' });
  }
};


// Get All Feedback 
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate({
        path: 'requestId',
        populate: { path: 'assignedEmployee', select: 'name' },
      })
      .populate('userId', 'name email');

    res.json(feedbacks);
  } catch (err) {
    console.error('Error fetching feedbacks:', err);
    res.status(500).json({ message: 'Error fetching feedbacks' });
  }
};

// Get feedbacks for a specific employee 
exports.getEmployeeFeedbacks = async (req, res) => {
  try {
    const employeeId = req.params.employeeId; 
    const feedbacks = await Feedback.find()
      .populate({
        path: 'requestId',
        populate: { path: 'assignedEmployee', select: 'name' },
      })
      .populate('userId', 'name email'); 

    // Filter feedbacks for those assigned to the specific employee
    const employeeFeedbacks = feedbacks.filter(feedback => 
      feedback.requestId?.assignedEmployee?._id?.toString() === employeeId
    );

    res.json(employeeFeedbacks);
  } catch (err) {
    console.error('Error fetching feedbacks for employee:', err);
    res.status(500).json({ message: 'Error fetching feedbacks' });
  }
};


// Delete Feedback by ID
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting feedback' });
  }
};
