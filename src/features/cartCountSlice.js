import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    count: localStorage.getItem("count")
}

const cartCountSlice = createSlice({
    name: "Cart Count",
    initialState,
    reducers: {
        cartCount: (state, action) => {
            state.count = action.payload;
        }
    }
});

export const { cartCount } = cartCountSlice.actions;

export default cartCountSlice.reducer;