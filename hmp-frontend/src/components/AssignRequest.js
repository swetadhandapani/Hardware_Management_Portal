import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../Layouts/AdminLayout";

const AssignRequest = () => {
  const [requests, setRequests] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [assignedEmployee, setAssignedEmployee] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isConfirmHovered, setIsConfirmHovered] = useState(false);
  const [isCancelHovered, setIsCancelHovered] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/hardware/requests");
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchRequests();
    fetchEmployees();
  }, []);

  const assignRequest = async () => {
    if (!selectedRequest || !assignedEmployee) return;

    try {
      const response = await axios.post("http://localhost:5000/api/hardware/assign", {
        requestId: selectedRequest._id,
        employeeId: assignedEmployee,
      });

      const updatedRequest = response.data;
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === updatedRequest._id
            ? { ...request, assignedEmployee: updatedRequest.assignedEmployee }
            : request
        )
      );

      alert("Request assigned successfully");
      setSelectedRequest(null);
      setAssignedEmployee("");
      setShowModal(false);
    } catch (error) {
      console.error("Error assigning request:", error);
      alert("Error assigning request");
    }
  };

  const openAssignModal = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  return (
    <AdminLayout title="Manage Requests">
      {/* Wrapper to add scrollable behavior */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>S.No.</th>
              <th style={styles.th}>User</th>
              <th style={styles.th}>Hardware</th>
              <th style={styles.th}>Details</th>
              <th style={styles.th}>Employee</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={request._id} style={styles.tr}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>
                  {request.userId ? request.userId.name : "Unknown"}
                </td>
                <td style={styles.td}>{request.hardware}</td>
                <td style={styles.td}>{request.description}</td>
                <td style={styles.td}>
                  {request.assignedEmployee ? request.assignedEmployee.name : "Not Assigned"}
                </td>
                <td
                  style={{
                    ...styles.td,
                    ...styles.status[request.status], // Apply color style based on status
                  }}
                >
                  {getStatusText(request.status)}
                </td>
                <td style={styles.td}>
                  {request.status === 3 || request.status === 0 ? (
                    <span>-</span>
                  ) : (
                    <button
                      style={styles.assignButton}
                      onClick={() => openAssignModal(request)}
                    >
                      Assign
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedRequest && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalHeading}>Assign Employee to Request</h3>
            <p>
              <strong>Hardware:</strong> {selectedRequest.hardware}
            </p>
            <p>
              <strong>Created At:</strong> {new Date(selectedRequest.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Request:</strong> {selectedRequest.description}
            </p>
            <p style={styles.modalStatus}>
              <strong>Status:</strong> {getStatusText(selectedRequest.status)}
            </p>

            <label htmlFor="employeeSelect" style={styles.selectLabel}>
              Select Employee:
            </label>
            <select
              id="employeeSelect"
              onChange={(e) => setAssignedEmployee(e.target.value)}
              value={assignedEmployee}
              style={styles.select}
            >
              <option value="">Select Employee</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.name}
                </option>
              ))}
            </select>

            <div style={styles.modalActions}>
              <button
                style={{
                  ...styles.confirmButton,
                  ...(isConfirmHovered ? styles.confirmButtonHover : {}),
                }}
                onMouseEnter={() => setIsConfirmHovered(true)}
                onMouseLeave={() => setIsConfirmHovered(false)}
                onClick={assignRequest}
                disabled={!assignedEmployee}
              >
                Confirm
              </button>
              <button
                style={{
                  ...styles.cancelButton,
                  ...(isCancelHovered ? styles.cancelButtonHover : {}),
                }}
                onMouseEnter={() => setIsCancelHovered(true)}
                onMouseLeave={() => setIsCancelHovered(false)}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

const getStatusText = (status) => {
  switch (status) {
    case 1:
      return "Pending";
    case 2:
      return "In Progress";
    case 3:
      return "Completed";
    case 0:
      return "Deleted";
    default:
      return "Unknown";
  }
};

const styles = {
  tableWrapper: {
    overflowY: "auto",
    height: "calc(100vh - 124px)", // Adjust the height to fit the screen with header and footer space
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
    textAlign: "left",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
  },
  status: {
    1: { color: "#FFA500", fontWeight: "bold" }, // Pending (Orange)
    2: { color: "#007bff", fontWeight: "bold" },  // In Progress (Blue)
    3: { color: "#00CF00", fontWeight: "bold" },  // Completed (Light Green)
    0: { color: "red", fontWeight: "bold" },      // Deleted (Red)
  },
  assignButton: {
    padding: "8px 12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "10px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "500px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  modalHeading: {
    marginBottom: "17px",
  },
  select: {
    width: "100%",
    padding: "8px",
    margin: "10px 0",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  selectLabel: {
    fontSize: "14px",
    color: "#333",
    marginBottom: "5px",
    display: "block",
    fontWeight: "bold",
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "4px",
  },
  cancelButton: {
    padding: "8px 12px",
    backgroundColor: "transparent",
    color: "#f44336",
    border: "2px solid #f44336",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
  },
  cancelButtonHover: {
    backgroundColor: "#f44336",
    color: "#fff",
  },
  confirmButton: {
    padding: "8px 12px",
    backgroundColor: "transparent",
    color: "#28a745",
    border: "2px solid #28a745",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
  },
  confirmButtonHover: {
    backgroundColor: "#28a745",
    color: "#fff",
  },
};

export default AssignRequest;
