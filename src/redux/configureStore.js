import { configureStore } from "@reduxjs/toolkit";
import countriesSlice from "./countriesSlice";

export const store = configureStore({
    reducer: {
        countries : countriesSlice,
    },
});