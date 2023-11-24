import { configureStore } from "@reduxjs/toolkit";
import foodReducer from './features/foodSlice';
import cartCountReducer from './features/cartCountSlice';
import cartItemReducer from './features/cartItemSlice';

const store = configureStore({
    reducer: {
        food: foodReducer,
        cartCount: cartCountReducer,
        cartItem: cartItemReducer
    }
});

export default store;