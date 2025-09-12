import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCountriesRegion = createAsyncThunk(
  "countries/fetchCountriesRegion",
  async (region) => {
    const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
    return await res.json();
  }
);

const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountriesRegion.pending, (state) => {
        state.status = "loading";   
      })
      .addCase(fetchCountriesRegion.fulfilled, (state, action) => {
        state.status = "success"; 
        state.list = action.payload;
      })
      .addCase(fetchCountriesRegion.rejected, (state, action) => {
        state.status = "failed";    
        state.error = action.error.message;
      });
  },
});

export default countriesSlice.reducer;
