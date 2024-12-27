import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCog, FaUserTie, FaUser, FaChevronDown } from "react-icons/fa"; 

const Dashboard = () => {
  const [showUserNav, setShowUserNav] = useState(false);
  const [showAdminNav, setShowAdminNav] = useState(false);

  const toggleUserNav = () => {
    setShowUserNav(!showUserNav);
  };

  const toggleAdminNav = () => {
    setShowAdminNav(!showAdminNav);
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Navigation</h2>
        <ul style={styles.navList}>
          {/* Admin Dashboard Link with Dropdown */}
          <li style={styles.navItem}>
            <span
              style={styles.navLink}
              onClick={toggleAdminNav}
              role="button"
              aria-expanded={showAdminNav}
            >
              <FaUserCog style={styles.icon} /> Admin Dashboard <FaChevronDown />
            </span>
            {showAdminNav && (
              <ul style={styles.subNavList}>
                <li style={styles.subNavItem}>
                  <Link style={styles.subNavLink} to="/admin">
                  Dashboard
                  </Link>
                </li>
                <li style={styles.subNavItem}>
                  <Link style={styles.subNavLink} to="/assign">
                  Assign Requests
                  </Link>
                </li>
                <li style={styles.subNavItem}>
                  <Link style={styles.subNavLink} to="/employees/create">
                  Create Employee
                  </Link>
                </li>
                <li style={styles.subNavItem}>
                  <Link style={styles.subNavLink} to="/employees">
                  Employee List
                  </Link>
                </li>
                <li style={styles.subNavItem}>
                  <Link style={styles.subNavLink} to="/employees/edit/:id">
                  Edit Employee
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Employee Dashboard Link */}
          <li style={styles.navItem}>
            <Link style={styles.navLink} to="/employee">
              <FaUserTie style={styles.icon} /> Employee Dashboard
            </Link>
          </li>

          {/* User Dashboard Link with Dropdown */}
          <li style={styles.navItem}>
            <span
              style={styles.navLink}
              onClick={toggleUserNav}
              role="button"
              aria-expanded={showUserNav}
            >
              <FaUser style={styles.icon} /> User Dashboard <FaChevronDown />
            </span>
            {showUserNav && (
              <ul style={styles.subNavList}>
                <li style={styles.subNavItem}>
                  <Link style={styles.subNavLink} to="/request">
                    Submit Hardware Request
                  </Link>
                </li>
                <li style={styles.subNavItem}>
                  <Link style={styles.subNavLink} to="/history">
                    Request History
                  </Link>
                </li>
                <li style={styles.subNavItem}>
                  <Link style={styles.subNavLink} to="/feedback">
                    User Feedback
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      <main style={styles.mainContent}>
        <h1 style={styles.mainTitle}>Dashboard</h1>
        <div style={styles.cardContainer}>
          <div style={styles.card}>
            <h4 style={styles.cardTitle}>Admin Dashboard</h4>
            <Link style={styles.cardLink} to="/admin">
              <button style={styles.button}>Go to Admin Dashboard</button>
            </Link>
          </div>

          <div style={styles.card}>
            <h4 style={styles.cardTitle}>Employee Dashboard</h4>
            <Link style={styles.cardLink} to="/employee">
              <button style={styles.button}>Go to Employee Dashboard</button>
            </Link>
          </div>

          <div style={styles.card}>
            <h4 style={styles.cardTitle}>User Dashboard</h4>
            <Link style={styles.cardLink} to="/user">
              <button style={styles.button}>Go to User Dashboard</button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

// Styles for the Dashboard component
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#e9ecef", 
  },
  sidebar: {
    width: "200px",
    backgroundColor: "#343a40", 
    padding: "20px",
    color: "#fff", 
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
  },
  sidebarTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  navList: {
    listStyleType: "none",
    padding: 0,
  },
  navItem: {
    marginBottom: "10px",
  },
  navLink: {
    textDecoration: "none",
    color: "#fff", 
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderRadius: "5px",
    transition: "background-color 0.2s",
  },
  subNavList: {
    listStyleType: "none",
    padding: "0 0 0 15px",
  },
  subNavItem: {
    marginBottom: "5px",
  },
  subNavLink: {
    textDecoration: "none",
    color: "#adb5bd", 
  },
  mainContent: {
    flex: 1,
    padding: "20px",
  },
  mainTitle: {
    fontSize: "2em",
    marginBottom: "20px",
  },
  cardContainer: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "300px",
  },
  cardTitle: {
    margin: "0 0 10px",
  },
  cardLink: {
    color: "#007bff",
    textDecoration: "none",
  },
  button: {
    backgroundColor: "#007bff", 
    color: "#fff", 
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  icon: {
    marginRight: "8px", 
  },
};

export default Dashboard;
