const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    feedbackText: { type: String, required: true },
    email: { type: String, required: true }, 
    contactNumber: { type: String }, 
    //userId: { type: String, required: true, ref: 'User' },
    //requestId: { type: String, required: true, ref: 'HardwareRequest' },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "HardwareRequest",
    },

    rating: { type: Number, required: true }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
