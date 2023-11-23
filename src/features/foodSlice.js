import { createSlice } from "@reduxjs/toolkit"  

const initialState = {
    foods: []
}

const foodSlice = createSlice({
    name: 'Food',
    initialState,
    reducers: {
        getAllFood: (state, action) => {
            state.foods = action.payload
        }
    }
});

export const { getAllFood } = foodSlice.actions;

export default foodSlice.reducer;