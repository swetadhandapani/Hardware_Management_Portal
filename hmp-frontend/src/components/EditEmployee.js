import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../Layouts/AdminLayout"; 

const EditEmployee = () => {
  const { id } = useParams(); // Get the employee ID from URL parameters
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
          setFormData(response.data); // Populate form data with employee details
        } catch (error) {
          console.error('Error fetching employee:', error);
          setError('Error fetching employee data.');
        }
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { password, ...dataToUpdate } = formData;
      const updatedData = password ? formData : dataToUpdate;

      await axios.put(`http://localhost:5000/api/employees/${id}`, updatedData);
      alert('Employee updated successfully');
      navigate('/employees');
    } catch (error) {
      console.error('Error updating employee:', error);
      setError('Error updating employee. Please try again.');
    }
  };

  return (
    <AdminLayout title="Edit Employee">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name:</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email:</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Password (Leave empty to keep current):</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.submitButton}>Update Employee</button>
      </form>
    </AdminLayout>
  );
};

// Styles
const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '600px',
    margin: '50px auto', 
    padding: '20px', 
    backgroundColor: '#f9f9f9',
    borderRadius: '8px', 
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', 
  },
  formGroup: {
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center', 
  },
  label: {
    marginRight: '10px', 
    fontWeight: 'bold',
    minWidth: '150px', 
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s',
    flex: 1, 
  },
  submitButton: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
};

export default EditEmployee;
