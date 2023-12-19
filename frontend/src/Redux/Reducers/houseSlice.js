import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
export const fetchHouses = createAsyncThunk('houses/fetchProperties', async (_, { getState }) => {
  try {
    const { searchTerm, minPrice, maxPrice, location } = getState().houses.filters;

    // Construct URL based on filters
    let url = `${BASE_URL}/v1/properties`;
    url = applySearchFilter(url, searchTerm);
    url = applyPriceFilter(url, minPrice, maxPrice);
    url = applyLocationFilter(url, location);

    // Make the API request
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
});

// Helper function to apply search filter
const applySearchFilter = (url, searchTerm) => {
  return searchTerm ? `${url}?searchTerm=${encodeURIComponent(searchTerm)}` : url;
};



// Helper function to apply location filter
const applyLocationFilter = (url, location) => {
  return location ? `${url}${url.includes('?') ? '&' : '?'}location=${encodeURIComponent(location)}` : url;
};


const housesSlice = createSlice({
  name: 'houses',
  initialState: {
    houses: [],
    status: 'idle',
    error: null,
    filters: {
      searchTerm: null,
      minPrice: null,
      maxPrice: null,
      location: null,
    },
  },
  reducers: {
    // Action to update search term filter
    updateSearchTerm: (state, action) => {
      state.filters.searchTerm = action.payload;
    },
    // Action to update price range filter
    updatePriceRange: (state, action) => {
      state.filters.minPrice = action.payload.minPrice;
      state.filters.maxPrice = action.payload.maxPrice;
    },
    // Action to update location filter
    updateLocation: (state, action) => {
      state.filters.location = action.payload;
    },
  },
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

export const { updateSearchTerm, updatePriceRange, updateLocation } = housesSlice.actions;
export default housesSlice.reducer;

