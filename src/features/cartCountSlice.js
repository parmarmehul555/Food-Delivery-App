import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    count: parseInt(localStorage.getItem("count"))
}

const cartCountSlice = createSlice({
    name: "Cart Count",
    initialState,
    reducers: {
        incrementCartCount: (state, action) => {
            state.count = state.count + action.payload;
        },
        decrementCartCount: (state, action) => {
            state.count = state.count - action.payload;
        }
    }
});

export const { incrementCartCount, decrementCartCount } = cartCountSlice.actions;

export default cartCountSlice.reducer;