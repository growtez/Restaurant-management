import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

// Dark Theme Colors (matching customer-web)
const darkTheme = {
    mode: 'dark',
    colors: {
        primary: '#d9b550',
        primaryDark: '#b8973f',
        background: '#212121',
        card: '#2D2D2D',
        cardHover: '#333333',
        text: '#FFFFFF',
        textSecondary: '#CCCCCC',
        textMuted: '#888888',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#FF4444',
        border: '#333333',
        star: '#FFD700',
        vegan: '#22c55e',
        nonVeg: '#ef4444',
        overlay: 'rgba(0, 0, 0, 0.8)',
        inputBg: 'rgba(255, 255, 255, 0.1)',
    },
};

// Light Theme Colors
const lightTheme = {
    mode: 'light',
    colors: {
        primary: '#d9b550',
        primaryDark: '#b8973f',
        background: '#F5F5F5',
        card: '#FFFFFF',
        cardHover: '#EEEEEE',
        text: '#212121',
        textSecondary: '#666666',
        textMuted: '#999999',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#FF4444',
        border: '#E0E0E0',
        star: '#FFD700',
        vegan: '#22c55e',
        nonVeg: '#ef4444',
        overlay: 'rgba(0, 0, 0, 0.5)',
        inputBg: 'rgba(0, 0, 0, 0.05)',
    },
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const systemColorScheme = useColorScheme();
    const [themeMode, setThemeMode] = useState('dark'); // 'dark', 'light', or 'system'

    const toggleTheme = (mode) => {
        setThemeMode(mode);
    };

    // Determine actual theme based on themeMode
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
        // Return default theme if context is not available
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
