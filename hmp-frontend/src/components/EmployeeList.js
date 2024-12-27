import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../Layouts/AdminLayout";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredEditButton, setHoveredEditButton] = useState(null); // Track hovered edit button
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${id}/status`, {
        status: "inactive",
      });

      if (response.status === 200) {
        setEmployees((prevEmployees) =>
          prevEmployees.map((employee) =>
            employee._id === id ? { ...employee, status: "inactive" } : employee
          )
        );
        alert("Employee marked as inactive successfully!");
      } else {
        alert("Failed to update employee status.");
      }
    } catch (error) {
      console.error("Error updating employee status:", error);
      alert("Error marking employee as inactive.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/employees/edit/${id}`);
  };

  const handleCreate = () => {
    navigate("/employees/create");
  };

  if (loading) {
    return <p>Loading employees...</p>;
  }

  return (
    <AdminLayout title="Employee">
      <div style={styles.header}>
        <h2>Employee</h2>
        <button onClick={handleCreate} style={styles.createButton}>
          Create Employee
        </button>
      </div>
      {employees.length > 0 ? (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>S.No</th>
                <th style={styles.th}>Employee Name</th>
                <th style={styles.th}>Email Address</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee._id} style={styles.tr}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{employee.name}</td>
                  <td style={styles.td}>{employee.email}</td>
                  <td style={styles.td}>{employee.role}</td>
                  <td style={styles.td}>
                    <span style={{ color: employee.status === "inactive" ? "red" : "green" }}>
                      {employee.status || "active"}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button
                      onClick={() => handleEdit(employee._id)}
                      style={{
                        ...styles.editButton,
                        ...(hoveredEditButton === employee._id && {
                          backgroundColor: "#6c757d",
                          color: "white",
                        }),
                      }}
                      onMouseEnter={() => setHoveredEditButton(employee._id)}
                      onMouseLeave={() => setHoveredEditButton(null)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(employee._id)}
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No employees found.</p>
      )}
    </AdminLayout>
  );
};

// Styles
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  createButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  tableWrapper: {
    overflowY: "auto",
    height: "calc(100vh - 124px)", // Adjust height to allow scrolling
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    backgroundColor: "#f2f2f2",
  },
  tr: {
    border: "1px solid #ddd",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
  },
  editButton: {
    backgroundColor: "transparent",
    color: "#6c757d", // Bootstrap secondary color
    border: "1px solid #6c757d", // Outline color for secondary
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
    marginRight: "10px",
    transition: "all 0.3s",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default EmployeeList;
