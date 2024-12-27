import axios from 'axios';

const loginEmployee = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/employee-login', {
      email,
      password,
    });

    console.log('Login successful:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Error logging in:', error.response ? error.response.data : error.message);
    throw error; 
  }
};

export { loginEmployee };
