import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { darkColors, lightColors } from '../theme';

const darkTheme = {
    mode: 'dark',
    colors: darkColors,
};

const lightTheme = {
    mode: 'light',
    colors: lightColors,
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const systemColorScheme = useColorScheme();
    const [themeMode, setThemeMode] = useState('dark');

    const toggleTheme = (mode) => {
        setThemeMode(mode);
    };

    const getActiveTheme = () => {
        if (themeMode === 'system') {
            return systemColorScheme === 'dark' ? darkTheme : lightTheme;
        }
        return themeMode === 'dark' ? darkTheme : lightTheme;
    };

    const theme = getActiveTheme();

    const value = {
        theme,
        themeMode,
        toggleTheme,
        isDark: theme.mode === 'dark',
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        return {
            theme: darkTheme,
            themeMode: 'dark',
            toggleTheme: () => { },
            isDark: true,
        };
    }
    return context;
}

export { darkTheme, lightTheme };
