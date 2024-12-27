import React from "react";
import UserLayout from "../Layouts/UserLayout";

const UserDashboard = () => {
  return (
    <UserLayout title="Home">
      <div style={styles.welcomeCard}>
        <h2 style={styles.heading}>Welcome to the FixIT Hub</h2>
        <p style={styles.paragraph}>
          Use the navigation links on the sidebar to submit a repair request or view your request history. 
          You can also access your user profile by clicking the user icon in the top-right corner, 
          where you can log out of your account.
        </p>
      </div>
    </UserLayout>
  );
};

//Styles 
const styles = {
  welcomeCard: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    marginBottom: "30px",
    maxWidth: "800px",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center", 
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: "2.5em",
    color: "#333",
    marginBottom: "20px",
    fontWeight: "600", 
  },
  paragraph: {
    fontSize: "1.2em",
    color: "#555",
    lineHeight: "1.8",
    maxWidth: "700px",
  },
  userInfo: {
    display: "inline-flex",
    alignItems: "center",
    marginTop: "10px",
    cursor: "pointer",
  },
  icon: {
    width: "24px",
    height: "24px",
    color: "#007bff", 
    marginRight: "10px",
  },
  logoutText: {
    fontSize: "1em",
    color: "#007bff",
    textDecoration: "underline",
  },
};

export default UserDashboard;
