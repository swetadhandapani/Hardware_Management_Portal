import axios from 'axios';

export const loginSuccess = (userData) => ({
  type: 'LOGIN_SUCCESS',
  payload: userData,
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      const userData = response.data;

      dispatch(loginSuccess(userData));
    } catch (error) {
      console.error('Login failed:', error);
      throw error; 
    }
  };
};
