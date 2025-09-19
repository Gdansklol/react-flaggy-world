import { createSlice } from "@reduxjs/toolkit";

const initialResults = JSON.parse(localStorage.getItem("quizResults")) || [];

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState: {
    results: initialResults,   
    sortOrder: "desc",       
  },
  reducers: {
    deleteResult: (state, action) => {
      const { username, region } = action.payload;
      state.results = state.results.filter(
        (result) => !(result.username === username && result.region === region)
      );
      localStorage.setItem("quizResults", JSON.stringify(state.results));
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
  },
});

export const { deleteResult, setSortOrder } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
