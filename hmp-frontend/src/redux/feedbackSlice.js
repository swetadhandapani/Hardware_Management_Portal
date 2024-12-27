import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createFeedback = createAsyncThunk('feedback/createFeedback', async (feedbackData) => {
  const response = await axios.post('/api/feedback/feedback', feedbackData);
  return response.data;
});

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createFeedback.fulfilled, (state, action) => {
      return { ...state, feedback: action.payload };
    });
  }
});

export default feedbackSlice.reducer;
