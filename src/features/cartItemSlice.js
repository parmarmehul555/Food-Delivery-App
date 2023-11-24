import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cartItems: []
}

const cartItemSlice = createSlice({
    name: "Cart item",
    initialState,
    reducers: {
        addCartItemList: (state, action) => {
            const data = action.payload;
            state.cartItems.push(data);
        },
        removeCartItemList: (state, action) => {
            const data = state.cartItems.slice(action.payload.index, -1);
            state.cartItems = data;
        }
    }
})

export const { addCartItemList, removeCartItemList } = cartItemSlice.actions;

export default cartItemSlice.reducer;