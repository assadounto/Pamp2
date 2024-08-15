// src/redux/slices/filterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    distance: 4000,
    price: 400,
    sort: 'Recommended',
    type: 'All',
    modal: false,
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter(state, action) {
            return { ...state, ...action.payload };
        },
    },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
