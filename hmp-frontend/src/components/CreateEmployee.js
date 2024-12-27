/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import AdminLayout from '../Layouts/AdminLayout'; 

const CreateEmployee = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Set role as "employee" directly in the request
      const response = await axios.post('http://localhost:5000/api/employees', {
        name,
        email,
        password,
        role: 'employee',  // Hardcoding "employee" as role
      });

      //console.log('Employee created:', response.data);
      alert('Employee created successfully!');
      navigate('/employees'); 

      // Reset form fields after successful submission
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('There was an error creating the employee:', error);
      alert('Error creating employee. Please try again.');
    }
  };

  return (
    <AdminLayout title="Create Employee"> 
      <div style={styles.container}>
        <div style={styles.welcomeCard}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.submitButton}>Create Employee</button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  welcomeCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  label: {
    flex: '1',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    flex: '3', 
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  submitButton: {
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    marginTop: '10px',
  },
};

export default CreateEmployee;
