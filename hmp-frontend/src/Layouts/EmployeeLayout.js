import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react"; 
import { useUser } from "../context/UserContext";

const EmployeeLayout = ({ children, title }) => {
  const { user, logout } = useUser(); 
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logo}>
          <Link to="/employee" style={styles.logoText}>
            <h1 style={styles.logoText}>FixIT Hub</h1>
          </Link>
        </div>
        <nav style={styles.nav}>
          <ul style={styles.navList}>
            <li style={styles.navItem}>
              <Link style={styles.navLink} to="/employee">
                Dashboard
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link style={styles.navLink} to="/employee/assigned-requests">
                Assigned Requests
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link style={styles.navLink} to="/employee/received-feedbacks">
                Received Feedbacks
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <h2 style={styles.headerTitle}>{title}</h2>
            <div style={styles.headerIcons}>
              <div style={styles.userBox}>
                <span style={styles.userName}>{user?.name}</span> 
                <div style={styles.dropdown}>
                  <User
                    style={styles.icon}
                    onClick={toggleDropdown}
                  />
                  {dropdownOpen && (
                    <div style={styles.dropdownMenu}>
                      <button
                        onClick={handleLogout}
                        style={styles.logoutButton}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main style={styles.dashboardContent}>{children}</main>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: { display: "flex", height: "100vh", backgroundColor: "#f8f9fa" },
  sidebar: {
    width: "200px",
    backgroundColor: "#fff",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
  },
  logo: { padding: "20px" },
  logoText: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#007bff",
    textDecoration: "none",
    textAlign: "center",
  },
  nav: { marginTop: "20px" },
  navList: { listStyleType: "none", padding: 0 },
  navItem: { marginBottom: "10px" },
  navLink: {
    textDecoration: "none",
    color: "#007bff",
    padding: "8px 12px",
    borderRadius: "4px",
    display: "block",
    transition: "background-color 0.3s",
  },
  mainContent: { flex: 1, overflow: "hidden" },
  header: {
    backgroundColor: "#fff",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  headerContent: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { fontSize: "24px", fontWeight: "bold", color: "#333" },
  headerIcons: { display: "flex", alignItems: "center" },
  userBox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f1f3f5",
    padding: "8px 12px",
    borderRadius: "20px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  },
  userName: {
    fontSize: "16px",
    color: "#333",
    marginRight: "10px",
    fontWeight: "600",
  },
  icon: {
    width: "24px",
    height: "24px",
    color: "#6c757d",
    marginLeft: "16px",
    cursor: "pointer",
  },
  dropdown: {
    position: "relative",
  },
  dropdownMenu: {
    position: "absolute",
    top: "30px",
    right: "0",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "4px",
    minWidth: "120px",
    zIndex: 10,
  },
  logoutButton: {
    padding: "8px 16px",
    fontSize: "14px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    textAlign: "center",
  },
  dashboardContent: {
    maxWidth: "1280px",
    margin: "24px auto",
    padding: "24px",
  },
};

export default EmployeeLayout;
