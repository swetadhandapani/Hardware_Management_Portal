import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../Layouts/AuthLayout'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/users/register', formData);
      alert('Registration Successful');
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <AuthLayout>
      <h2 style={styles.heading}>User Registration</h2> 
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          onChange={handleChange}
          value={formData.name}
          placeholder="Name"
          required
          style={styles.input}
        />
        <input
          name="email"
          onChange={handleChange}
          value={formData.email}
          placeholder="Email"
          type="email"
          required
          style={styles.input}
        />
        <div style={styles.passwordContainer}>
          <input
            name="password"
            onChange={handleChange}
            value={formData.password}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            required
            style={styles.inputWithIcon}
          />
          <span style={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div style={styles.passwordContainer}>
          <input
            name="confirmPassword"
            onChange={handleChange}
            value={formData.confirmPassword}
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            required
            style={styles.inputWithIcon}
          />
          <span style={styles.eyeIcon} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        <button type="submit" style={styles.button}>Register</button>
      </form>
    </AuthLayout>
  );
};

// Styles
const styles = {
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    gap: '10px', 
  },
  input: {
    padding: '10px',
    margin: '2px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  inputWithIcon: {
    padding: '10px',
    margin: '2px 0', 
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    paddingRight: '30px',
  },
  passwordContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: '10px',
    cursor: 'pointer',
    color: '#333',
    fontSize: '20px',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  error: {
    color: 'red',
    fontSize: '14px',
  },
};

export default Registration;
