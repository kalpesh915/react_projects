import { createSlice, createSelector } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : "Cart",
    initialState : [],
    reducers : {
        ADD_TO_CART : (state, action) => {
           state.push(action.payload);
        }
    }
});

export const getItemSelector = createSelector((state) => state.cart, (state)=> state);

export const {ADD_TO_CART} = cartSlice.actions;
export default cartSlice.reducer;