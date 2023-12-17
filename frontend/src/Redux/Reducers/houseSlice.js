import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const fetchHouses = createAsyncThunk('houses/fetchProperties', async () => {
  const response = await axios.get(`${BASE_URL}/v1/properties`);
  return response.data;
});

const housesSlice = createSlice({
  name: 'houses',
  initialState: {
    houses: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHouses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHouses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.houses = action.payload;
      })
      .addCase(fetchHouses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default housesSlice.reducer;
