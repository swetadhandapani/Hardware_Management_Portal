import React from 'react';
import { useNavigate } from 'react-router-dom';

const HardwareRequestItem = ({ hardwareRequest }) => {
  const navigate = useNavigate();

  const handleFeedback = () => {
    navigate('/feedback', { state: { requestId: hardwareRequest._id } });
  };

  return (
    <div className="hardware-request-item" style={styles.itemContainer}>
      <h2 style={styles.header}>
        {hardwareRequest.hardware} - {hardwareRequest.deviceModel}
      </h2>

      <p style={styles.info}>
        <strong>Contact Number:</strong> {hardwareRequest.contactNumber}
      </p>

      <p style={styles.info}>
        <strong>Description:</strong> {hardwareRequest.description}
      </p>

      <p style={styles.status}>
        <strong>Status:</strong> {hardwareRequest.status === 0 ? 'Deleted' :
          hardwareRequest.status === 1 ? 'Pending' :
          hardwareRequest.status === 2 ? 'In Progress' :
          hardwareRequest.status === 3 ? 'Completed' : 'Unknown'}
      </p>

      {hardwareRequest.status === 3 && hardwareRequest.feedbackLink && (
        <button
          style={styles.feedbackButton}
          onClick={handleFeedback}
        >
          Give Feedback
        </button>
      )}
    </div>
  );
};

// Styles for the HardwareRequestItem component
const styles = {
  itemContainer: {
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    marginBottom: "15px",
  },
  header: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  info: {
    marginBottom: "8px",
    fontSize: "16px",
  },
  status: {
    marginBottom: "10px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  feedbackButton: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default HardwareRequestItem;
