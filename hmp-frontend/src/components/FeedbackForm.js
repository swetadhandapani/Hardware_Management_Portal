/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

const FeedbackForm = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const queryRequestId = params.get("requestId");
  const stateRequestId = location.state?.requestId;
  const assignedEmployeeName = location.state?.assignedEmployeeName;


  const requestId = queryRequestId || stateRequestId;
  const { user } = useUser();
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);

  // Debugging logs
  /*console.log("User:", user);
  console.log("Request ID:", requestId);
  console.log("Location State:", location.state);
  console.log("Assigned Employee Name:", assignedEmployeeName);*/

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!user || !requestId) {
      console.log("Missing user or request ID");
      alert("Missing user information or request ID.");
      return;
    }
  
    try {
      const response = await axios.post(`http://localhost:5000/api/feedback`, {
        feedbackText: feedback,
        userId: user._id,  
        requestId: requestId,
        email: user.email,
        rating: parseInt(rating, 10),
      });
  
      alert("Feedback submitted successfully.");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting the feedback.");
    }
  };
  
  

  return (
    <div style={styles.formContainer}>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Display assigned employee name if available */}
        {assignedEmployeeName && (
          <div style={styles.employeeName}>
            <strong>Assigned Employee: </strong>
            {assignedEmployeeName}
          </div>
        )}
        <label htmlFor="feedback" style={styles.label}>
          Feedback
        </label>
        <textarea
          id="feedback"
          name="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          style={styles.textarea}
          required
        />
        <label htmlFor="rating" style={styles.label}>
          Rating (1-5)
        </label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          style={styles.inputField}
        />
        <button type="submit" style={styles.submitButton}>
          Submit Feedback
        </button>
      </form>
    </div>
  );
  
};

const styles = {
  formContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 100px)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "600px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  label: {
    marginBottom: "5px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  textarea: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
    resize: "none",
    height: "150px",
    marginBottom: "10px",
  },
  inputField: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
    marginBottom: "10px",
  },
  submitButton: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  },
  employeeName: {
    marginTop: "10px",
    fontSize: "16px",
    color: "#333",
    fontWeight: "bold",
    marginBottom: "20px",  
  },
};


export default FeedbackForm;
