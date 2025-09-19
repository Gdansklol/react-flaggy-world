import { configureStore } from "@reduxjs/toolkit";
import countriesSlice from "./countriesSlice";
import quizSlice from "./quizSlice";
import leaderboardSlice from "./leaderboardSlice";

export const store = configureStore({
    reducer: {
        countries : countriesSlice,
        quiz: quizSlice,
        leaderboard: leaderboardSlice,
    },
});