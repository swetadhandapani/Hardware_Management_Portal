const mongoose = require('mongoose');

const hardwareRequestSchema = new mongoose.Schema({
  hardware: { type: String, required: true },
  deviceModel: { type: String, required: true },
  contactNumber: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  assignedEmployee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // This is the field we update
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'HardwareRequest' },

  status: { 
    type: Number, 
    enum: [0, 1, 2, 3],  // Numbered statuses: 0 (deleted), 1 (pending), 2 (in progress), 3 (completed)
    default: 1  // Default status is 'Pending' (1)
  },
  feedbackLink: { type: String, default: '' },
  feedbackSubmitted: { type: Boolean, default: false },  
}, { timestamps: true });

module.exports = mongoose.model('HardwareRequest', hardwareRequestSchema);
