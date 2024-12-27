import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk('user/register', async (userData) => {
  const response = await axios.post('/api/users/register', userData);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      return { ...state, user: action.payload };
    });
  }
});

export default userSlice.reducer;
