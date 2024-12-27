import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createRequest = createAsyncThunk('hardware/createRequest', async (requestData) => {
  const response = await axios.post('/api/hardware/create', requestData);
  return response.data;
});


const hardwareSlice = createSlice({
  name: 'hardware',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createRequest.fulfilled, (state, action) => {
      return { ...state, request: action.payload };
    });
  }
});

export default hardwareSlice.reducer;
