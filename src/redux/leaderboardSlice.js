import { createSlice } from "@reduxjs/toolkit";

const initialResults = JSON.parse(localStorage.getItem("quizResults")) || [];

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState: {
    results: initialResults,   
    sortOrder: "desc",       
  },
  reducers: {
    addResult:(state, action) => {
        state.results.push(action.payload);
        localStorage.setItem("quizResults", JSON.stringify(state.results));
    },

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

export const { addResult, deleteResult, setSortOrder } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
