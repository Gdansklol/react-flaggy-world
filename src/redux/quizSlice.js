import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    score: 0,
    currentIndex: 0,
    stage: "start", // "start" | "inProgress" | "finished"
  },
  reducers: {
    incrementScore: (state) => {
      state.score = state.score + 1;
    },
    nextQuestion: (state) => {
      state.currentIndex = state.currentIndex + 1;
    },
    resetQuiz: (state) => {
      state.score = 0;
      state.currentIndex = 0;
      state.stage = "start";
    },
    setStage: (state, action) => {
      state.stage = action.payload;
    },
  },
});

export const { incrementScore, nextQuestion, resetQuiz, setStage } =
  quizSlice.actions;
  
export default quizSlice.reducer;
