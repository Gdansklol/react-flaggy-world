import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    score: 0,
    currentIndex: 0,
    stage: "start", // "start" | "inProgress" | "finished"
    questions: [],
    feedback: "",
    userAnswer: "",
    username: "",
    region: "Europe", 
  },
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setFeedback: (state, action) => {
      state.feedback = action.payload;
    },
    setUserAnswer: (state, action) => {
      state.userAnswer = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setRegion: (state, action) => {
      state.region = action.payload;
    },
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
      state.questions = [];
      state.feedback = "";
      state.userAnswer = "";
      state.username = "";     
      state.region = "Europe";
    },
    setStage: (state, action) => {
      state.stage = action.payload;
    },
  },
});

export const { 
  setQuestions, setFeedback, setUserAnswer, setUsername, setRegion,
  incrementScore, nextQuestion, resetQuiz, setStage 
} = quizSlice.actions;

export default quizSlice.reducer;
