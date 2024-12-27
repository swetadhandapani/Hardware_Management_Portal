import React, { useState, useContext } from 'react';
import { loginEmployee } from '../services/employeeService'; 
import { EmployeeContext } from '../context/EmployeeContext'; 
import { useNavigate } from 'react-router-dom'; 

const EmployeeLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setEmployee } = useContext(EmployeeContext); 
  const [error, setError] = useState(''); 
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginEmployee(email, password); 
      setEmployee({ id: data.employee._id, ...data.employee }); 
      //alert('Login successful');
      navigate('/employee'); 
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials.'); 
    }
};


  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Employee Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            required 
            style={styles.input} 
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            required 
            style={styles.input} 
          />
          <button type="submit" style={styles.button}>Login</button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
        <button 
          onClick={() => alert('Forgot password functionality to be implemented.')} 
          style={styles.forgotPassword}
        >
          Forgot password?
        </button>
      </div>
    </div>
  );
};

// Styles
const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', 
    backgroundImage: 'url("https://img.freepik.com/free-vector/network-mesh-wire-digital-technology-background_1017-27428.jpg?w=1060&t=st=1728372929~exp=1728373529~hmac=8724d3355a5b4c814e96576dc9dcf8767d2099c8ef8db6bb547776959b35fdc4")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    maxWidth: '500px', 
    width: '100%',
    margin: '0 auto',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
  },
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
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
    margin: '10px 0',
  },
  forgotPassword: {
    marginTop: '10px',
    color: '#007BFF',
    background: 'none',
    border: 'none',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};

export default EmployeeLogin;
