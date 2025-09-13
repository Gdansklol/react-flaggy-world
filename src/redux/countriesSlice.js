import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCountriesRegion = createAsyncThunk(
  "countries/fetchCountriesRegion",
  async (region) => {
    const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
    return await res.json();
  }
);

export const fetchCountryDetail = createAsyncThunk(
  "countries/fetchCountryDetail",
  async (countryName) => {
    const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    const data = await res.json();
    return data[0];
  }
);

const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    list: [],
    detail: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // region fetch
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
      })

      // detail fetch
      .addCase(fetchCountryDetail.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCountryDetail.fulfilled, (state, action) => {
        state.status = "success";
        state.detail = action.payload;
      })
      .addCase(fetchCountryDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default countriesSlice.reducer;
