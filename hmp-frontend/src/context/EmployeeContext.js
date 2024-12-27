import React, { createContext, useState } from 'react';

export const EmployeeContext = createContext();

// EmployeeProvider component that wraps the app and provides the employee data
export const EmployeeProvider = ({ children }) => {
  const [employee, setEmployee] = useState(null); 
  return (
    <EmployeeContext.Provider value={{ employee, setEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

