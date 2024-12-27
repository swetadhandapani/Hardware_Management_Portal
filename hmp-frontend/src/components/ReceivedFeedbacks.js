import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import EmployeeLayout from "../Layouts/EmployeeLayout";

const ReceivedFeedbacks = () => {
  const { user } = useContext(UserContext);
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user._id) {
      setError("No user data available.");
      setLoading(false);
      return;
    }

    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `http://localhost:5000/api/feedback/employee/${user._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFeedbacks(data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
        setError("Could not fetch feedbacks.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [user]);

  return (
    <EmployeeLayout title="Received Feedbacks">
      <div style={styles.container}>
        <h2 style={styles.heading}>Received Feedbacks</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {error && <p style={styles.error}>{error}</p>}
            {feedbacks.length === 0 ? (
              <p style={styles.noFeedbackText}>No feedbacks received yet.</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>S.No.</th>
                    <th style={styles.th}>Employee</th>
                    <th style={styles.th}>Request</th>
                    <th style={styles.th}>Feedback Text</th>
                    <th style={styles.th}>Rating</th>
                    <th style={styles.th}>Feedback By</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map((feedback, index) => (
                    <tr key={feedback._id} style={styles.tr}>
                      <td style={styles.td}>{index + 1}</td>
                      <td style={styles.td}>
                        {feedback.requestId?.assignedEmployee?.name || "N/A"}
                      </td>
                      <td style={styles.td}>
                        {feedback.requestId?.description}
                      </td>
                      <td style={styles.td}>{feedback.feedbackText}</td>
                      <td style={styles.td}>{feedback.rating}</td>
                      <td style={styles.td}>
                        {feedback.userId?.name} ({feedback.userId?.email})
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </EmployeeLayout>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    margin: "20px auto",
    maxWidth: "1000px",
  },
  heading: {
    fontSize: "26px",
    color: "#333",
    marginBottom: "15px",
    textAlign: "center",
  },
  error: { color: "red", textAlign: "center" },
  noFeedbackText: { textAlign: "center", fontStyle: "italic" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
  th: {
    border: "1px solid #ddd",
    padding: "12px 15px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "left",
  },
  tr: { "&:hover": { backgroundColor: "#f1f1f1" } },
  td: {
    border: "1px solid #ddd",
    padding: "12px 15px",
    backgroundColor: "#f9f9f9",
  },
};

export default ReceivedFeedbacks;
