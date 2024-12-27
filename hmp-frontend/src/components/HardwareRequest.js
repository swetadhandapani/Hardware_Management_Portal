import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserLayout from "../Layouts/UserLayout"; 

const HardwareRequestForm = () => {
  const { user, setUser, loading } = useContext(UserContext); 
  const [formData, setFormData] = useState({
    hardware: "",
    deviceModel: "",
    contactNumber: "",
    description: "",
    status: 1,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) { 
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        alert("Please log in to submit a hardware request.");
        navigate("/login");
      }
    }
  }, [user, setUser, navigate, loading]); 

  // Get the user ID from the context
  const userId = user ? user._id : null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("User not found, please log in.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/hardware/create",
        { ...formData, userId }
      );
      const { requestId } = response.data;

      // Update user context with requestId
      setUser((prevUser) => ({ ...prevUser, requestId }));

      // Store IDs in local storage for future use
      localStorage.setItem("userId", userId);
      localStorage.setItem("requestId", requestId);

      alert("Request submitted successfully");

      // Reset form fields after successful submission
      setFormData({
        hardware: "",
        deviceModel: "",
        contactNumber: "",
        description: "",
        status: 1,
      });
    } catch (error) {
      console.error("Error submitting hardware request:", error);
      alert("Error submitting the request. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <UserLayout title="Repair Request">
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label htmlFor="hardware" style={styles.label}>
            Choose Your Hardware
          </label>
          <select
            name="hardware"
            id="hardware"
            value={formData.hardware}
            onChange={handleChange}
            style={styles.inputField}
            required
          >
            <option value="">Select Hardware</option>
            <option value="Laptop">Laptop</option>
            <option value="Desktop">Desktop</option>
            <option value="Printer">Printer</option>
            <option value="Monitor">Monitor</option>
          </select>

          <label htmlFor="deviceModel" style={styles.label}>
            Device Model
          </label>
          <input
            type="text"
            name="deviceModel"
            id="deviceModel"
            value={formData.deviceModel}
            onChange={handleChange}
            placeholder="Device Model"
            required
            style={styles.inputField}
          />

          <label htmlFor="contactNumber" style={styles.label}>
            Contact Number
          </label>
          <input
            type="tel"
            name="contactNumber"
            id="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Contact Number"
            required
            style={styles.inputField}
          />

          <label htmlFor="description" style={styles.label}>
            Describe Your Issue
          </label>
          <textarea
            name="description"
            id="description"
            onChange={handleChange}
            value={formData.description}
            placeholder="Describe your hardware issue"
            required
            style={styles.textarea}
          />

          <button type="submit" style={styles.submitButton}>
            Submit Request
          </button>
        </form>
      </div>
    </UserLayout>
  );
};

// Styles for the HardwareRequestForm component
const styles = {
  formContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 100px)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "600px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  label: {
    marginBottom: "5px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  inputField: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
    marginBottom: "10px",
  },
  textarea: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
    resize: "none",
    height: "150px",
    marginBottom: "10px",
  },
  submitButton: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  },
};

export default HardwareRequestForm;
