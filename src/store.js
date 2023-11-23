import { configureStore } from "@reduxjs/toolkit";
import foodReducer from './features/foodSlice';

const store = configureStore({
    reducer:{
        food:foodReducer
    }
});

export default store;