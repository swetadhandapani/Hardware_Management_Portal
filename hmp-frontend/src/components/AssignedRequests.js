import React, { useEffect, useContext, useState, useCallback } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import EmployeeLayout from "../Layouts/EmployeeLayout";

const AssignedRequests = () => {
  const { user } = useContext(UserContext);  // Accessing user from context
  const [assignedRequests, setAssignedRequests] = useState([]);
  const [error, setError] = useState("");

  const fetchAssignedRequests = useCallback(async () => {
    if (user && user._id) {  
      try {
        const response = await axios.get(
          `http://localhost:5000/api/hardware/requests/assigned/${user._id}`  
        );
        setAssignedRequests(response.data);
      } catch (error) {
        console.error("Error fetching assigned requests:", error);
        setError("Could not fetch assigned requests.");
      }
    } else {
      setError("No user data available.");
    }
  }, [user]);

  useEffect(() => {
    fetchAssignedRequests();
  }, [fetchAssignedRequests]);

  const markAsCompleted = async (requestId) => {
    try {
      await axios.post("http://localhost:5000/api/hardware/complete", {
        requestId,
      });
      setAssignedRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === requestId ? { ...req, status: 3 } : req
        )
      );
    } catch (error) {
      console.error("Error marking request as completed:", error);
    }
  };

  return (
    <EmployeeLayout title="Assigned Requests">
      <div style={styles.container}>
        <h1 style={styles.heading}>Assigned Requests</h1>
        {error && <p style={styles.error}>{error}</p>}
        {assignedRequests.length === 0 ? (
          <p style={styles.noRequestsText}>No assigned requests</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>S.No.</th>
                <th style={styles.th}>Request</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignedRequests.map((request, index) => (
                <tr key={request._id} style={styles.tr}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{request.description}</td>
                  <td style={styles.td}>
                    {request.status === 1
                      ? "Pending"
                      : request.status === 2
                      ? "In Progress"
                      : "Completed"}
                  </td>
                  <td style={styles.td}>
                    {request.status === 2 ? (
                      <button
                        style={styles.completeButton}
                        onClick={() => markAsCompleted(request._id)}
                      >
                        Mark as Completed
                      </button>
                    ) : request.status === 3 ? (
                      <span>-</span>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </EmployeeLayout>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
    maxWidth: "800px",
    margin: "20px auto",
  },
  heading: { textAlign: "center", marginBottom: "20px" },
  error: { color: "red", textAlign: "center" },
  noRequestsText: { textAlign: "center", fontStyle: "italic" },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    backgroundColor: "#f2f2f2",
    textAlign: "left",
  },
  tr: {
    border: "1px solid #ddd",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
  },
  completeButton: {
    padding: "6px 10px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "0.875rem",
    cursor: "pointer",
  },
};

export default AssignedRequests;
