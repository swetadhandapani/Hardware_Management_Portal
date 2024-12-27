const initialState = {
    employeeId: null,
    assignedRequests: [],
  };
  
  const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_EMPLOYEE_SUCCESS':
        return {
          ...state,
          employeeId: action.payload.id,
          assignedRequests: action.payload.assignedRequests || [],
        };
      case 'MARK_REQUEST_COMPLETED':
        return {
          ...state,
          assignedRequests: state.assignedRequests.filter(request => request.id !== action.payload.requestId),
        };
      case 'LOGOUT':
        return {
          ...initialState, 
        };
      default:
        return state;
    }
  };
  
  export default employeeReducer;
  