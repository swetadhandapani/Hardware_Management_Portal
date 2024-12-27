const initialState = {
    id: null,
    email: '',
    role: '',
    isAuthenticated: false,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          id: action.payload.id,
          email: action.payload.email,
          role: action.payload.role,
          isAuthenticated: true,
        };
      case 'LOGOUT':
        return {
          ...initialState, 
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  