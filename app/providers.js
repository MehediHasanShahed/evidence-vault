'use client';
import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from './theme';

const ThemeContext = createContext({
    mode: 'light',
    toggleTheme: () => { },
});

export const useThemeMode = () => useContext(ThemeContext);

export default function Providers({ children, initialTheme = 'light' }) {
    // Always start with the server's initial theme to avoid hydration mismatch
    const [mode, setMode] = useState(initialTheme);

    // Create MUI theme from current mode (must be initialized before effects that use it)
    const theme = useMemo(() => getTheme(mode), [mode]);

    // Sync cookie with localStorage after mount (in case they differ)
    useEffect(() => {
        // Update cookie to match current mode on mount
        document.cookie = `themeMode=${mode}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
        localStorage.setItem('themeMode', mode);
    }, []);

    // Save theme preference whenever it changes
    useEffect(() => {
        localStorage.setItem('themeMode', mode);
        document.cookie = `themeMode=${mode}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    }, [mode]);

    // Update body background and text color to match the MUI theme when it changes
    useEffect(() => {
        if (typeof document !== 'undefined') {
            // Prefer theme palette values if available
            try {
                document.body.style.backgroundColor = theme?.palette?.background?.default || (mode === 'dark' ? '#0a1929' : '#f5f7fa');
                document.body.style.color = theme?.palette?.text?.primary || (mode === 'dark' ? '#fff' : '#000');
            } catch (e) {
                // Fallback in case theme shape changes
                document.body.style.backgroundColor = mode === 'dark' ? '#0a1929' : '#f5f7fa';
                document.body.style.color = mode === 'dark' ? '#fff' : '#000';
            }
        }
    }, [theme, mode]);

    const toggleTheme = () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const contextValue = useMemo(() => ({ mode, toggleTheme }), [mode]);

    return (
        <ThemeContext.Provider value={contextValue}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
}
