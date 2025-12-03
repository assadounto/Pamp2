import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance, useColorScheme, AppState } from 'react-native';
import { useThemeMode,useTheme } from '@rneui/themed';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const { setMode } = useThemeMode();
    const {theme}= useTheme()
    const systemColorScheme = useColorScheme();
    const [themeMode, setThemeMode] = useState('system');
    const [appState, setAppState] = useState(AppState.currentState);

// useEffect(() => {
//      setMode(systemColorScheme)
//     }, [systemColorScheme]);


 

    const toggleTheme = async (themeValue) => {
        try {
            await AsyncStorage.setItem('theme', themeValue);
            setThemeMode(themeValue);
            setMode(themeValue === 'system' ? systemColorScheme : themeValue);
        } catch (error) {
            console.error("Failed to save theme", error);
        }
    };

    const isDarkMode = themeMode === 'dark' || (themeMode === 'system' && systemColorScheme === 'dark');

    return (
        <ThemeContext.Provider value={{ isDarkMode, themeMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeProvider, ThemeContext };
