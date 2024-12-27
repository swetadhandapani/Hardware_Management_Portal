import React from "react";
import EmployeeLayout from "../Layouts/EmployeeLayout";

const EmployeeDashboard = () => {
  return (
    <EmployeeLayout title="Home">
      <div style={styles.container}>
        <h1 style={styles.heading}>Welcome to FixIT Hub!</h1>
        <p style={styles.paragraph}>
          Here, you can view and manage assigned tasks, check status updates, and ensure efficient handling of requests. Navigate through your dashboard to monitor and complete your assigned tasks seamlessly.
        </p>
      </div>
    </EmployeeLayout>
  );
};

const styles = {
  container: {
    padding: "30px",
    backgroundColor: "#f9fafb", 
    borderRadius: "12px",
    maxWidth: "800px",
    margin: "30px auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
  },
  heading: {
    textAlign: "center",
    marginBottom: "15px",
    fontSize: "1.8rem",
    color: "#333", 
    fontWeight: "600",
  },
  paragraph: {
    textAlign: "center",
    fontSize: "1.1rem",
    color: "#555", 
    lineHeight: "1.6",
    marginTop: "10px",
    maxWidth: "700px",
    margin: "0 auto",
  },
};

export default EmployeeDashboard;
