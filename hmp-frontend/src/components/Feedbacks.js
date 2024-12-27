import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../Layouts/AdminLayout";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/feedback");
        setFeedbacks(data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
      }
    };

    fetchFeedbacks();
  }, []);

  // Styling objects
  const containerStyles = {
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    margin: "20px auto",
    maxWidth: "1000px",
  };

  const tableStyles = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  };

  const thStyles = {
    border: "1px solid #ddd",
    padding: "12px 15px",
    backgroundColor: "#f2f2f2",
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
  };

  const tdStyles = {
    border: "1px solid #ddd",
    padding: "12px 15px",
    backgroundColor: "#f9f9f9",
  };

  const headerStyles = {
    fontSize: "26px",
    color: "black",
    marginBottom: "15px",
    textAlign: "center",
  };

  const rowStyles = {
    "&:hover": {
      backgroundColor: "#f1f1f1",
    },
  };

  // Wrapper for table with scroll styles
  const tableWrapperStyles = {
    overflowY: "auto",
    height: "calc(100vh - 124px)", // Adjust the height to fit the screen with header and footer space
  };

  return (
    <AdminLayout title="View Feedbacks">
      <div style={containerStyles}>
        <h2 style={headerStyles}>All Feedbacks</h2>

        {/* Wrapper for table to enable scrolling */}
        <div style={tableWrapperStyles}>
          <table style={tableStyles}>
            <thead>
              <tr>
                <th style={thStyles}>S.No.</th>
                <th style={thStyles}>Employee</th>
                <th style={thStyles}>Feedback Text</th>
                <th style={thStyles}>Rating</th>
                <th style={thStyles}>Feedback By</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback, index) => (
                <tr key={feedback._id} style={rowStyles}>
                  <td style={tdStyles}>{index + 1}</td>
                  <td style={tdStyles}>
                    {feedback.requestId?.assignedEmployee?.name || "Unassigned"}
                  </td>
                  <td style={tdStyles}>{feedback.feedbackText}</td>
                  <td style={tdStyles}>{feedback.rating}</td>
                  <td style={tdStyles}>
                    {feedback.userId?.name} ({feedback.email})
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Feedbacks;
