import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const UserContext = createContext();

// UserProvider component to manage user state
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  const fetchUserData = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser._id) {
        const response = await axios.get(`http://localhost:5000/api/users/${storedUser._id}`);
        const userData = response.data;

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false); 
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // useEffect to handle fetching user data from localStorage or API
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && !user) {
      setUser(storedUser); // Set user from local storage if available
      setLoading(false); // Stop loading
    } else if (storedUser && user?._id !== storedUser._id) {
      fetchUserData(); // Fetch from API if user id doesn't match
    }
  }, [user]); // Runs on change of user state

  return (
    <UserContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
