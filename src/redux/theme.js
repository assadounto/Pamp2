// src/redux/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: 'light', // default theme
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setLightTheme: (state) => {
            state.theme = 'light';
        },
        setDarkTheme: (state) => {
            state.theme = 'dark';
        },
    },
});

export const { setLightTheme, setDarkTheme } = themeSlice.actions;
export default themeSlice.reducer;
