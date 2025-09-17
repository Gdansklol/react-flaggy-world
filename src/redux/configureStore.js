import { configureStore } from "@reduxjs/toolkit";
import countriesSlice from "./countriesSlice";
import quizSlice from "./quizSlice";

export const store = configureStore({
    reducer: {
        countries : countriesSlice,
        quiz: quizSlice,
    },
});