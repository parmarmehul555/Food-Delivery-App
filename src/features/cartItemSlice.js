import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cartItems: []
}

const cartItemSlice = createSlice({
    name: "Cart item",
    initialState,
    reducers: {
        addCartItemList: (state, action) => {
            state.cartItems = action.payload
        }
    }
})

export const { addCartItemList } = cartItemSlice.actions;

export default cartItemSlice.reducer;