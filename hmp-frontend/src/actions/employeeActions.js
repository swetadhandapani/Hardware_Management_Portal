export const fetchEmployeeSuccess = (employeeData) => ({
    type: 'FETCH_EMPLOYEE_SUCCESS',
    payload: employeeData,
  });
  
  export const markRequestCompleted = (requestId) => ({
    type: 'MARK_REQUEST_COMPLETED',
    payload: { requestId },
  });
  