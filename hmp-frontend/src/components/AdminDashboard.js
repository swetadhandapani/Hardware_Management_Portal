import React from "react";
import AdminLayout from "../Layouts/AdminLayout";

const AdminDashboard = () => {
  return (
    <AdminLayout title="Home">
      <div style={styles.welcomeCard}>
        <h2 style={styles.heading}>Welcome to FixIT Hub!</h2>
        <p style={styles.paragraph}>
          Here, you can manage employees, assign repair requests, and view employee lists. Utilize the intuitive navigation to create new employee profiles and efficiently oversee your team’s activities at FixIT Hub.
        </p>
      </div>
    </AdminLayout>
  );
};

//Styles
const styles = {
  welcomeCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
  heading: {
    fontSize: "2em",
    color: "#333",
    marginBottom: "15px",
  },
  paragraph: {
    fontSize: "1.2em",
    color: "#555",
    lineHeight: "1.6",
  },
};

export default AdminDashboard;
