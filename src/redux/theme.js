// src/redux/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: 'light', // default theme
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheTheme: (state,action) => {
            state.theme = action.payload;
        },
        setDarkTheme: (state) => {
            state.theme = 'dark';
        },
    },
});

export const { setTheTheme, setDarkTheme } = themeSlice.actions;
export default themeSlice.reducer;
