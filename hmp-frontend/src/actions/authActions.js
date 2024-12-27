import axios from "axios";

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post("/api/auth/login", credentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
    return response; 
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error.message });
    throw error; 
  }
};
