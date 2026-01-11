'use client';
import { createTheme } from '@mui/material/styles';

// Create theme based on mode
export const getTheme = (mode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light' ? {
      // Light mode colors
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
      },
      secondary: {
        main: '#7c4dff',
        light: '#b47cff',
        dark: '#3f1dcb',
      },
      background: {
        default: '#f5f7fa',
        paper: '#ffffff',
      },
    } : {
      // Dark mode colors
      primary: {
        main: '#90caf9',
        light: '#e3f2fd',
        dark: '#42a5f5',
      },
      secondary: {
        main: '#b388ff',
        light: '#e7b9ff',
        dark: '#7c4dff',
      },
      background: {
        default: '#0a1929',
        paper: '#132f4c',
      },
    }),
    success: {
      main: mode === 'light' ? '#2e7d32' : '#66bb6a',
      light: '#4caf50',
    },
    warning: {
      main: mode === 'light' ? '#ed6c02' : '#ffa726',
      light: '#ff9800',
    },
    error: {
      main: mode === 'light' ? '#d32f2f' : '#f44336',
      light: '#ef5350',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: mode === 'light'
            ? '0 2px 8px rgba(0,0,0,0.08)'
            : '0 2px 8px rgba(0,0,0,0.3)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderColor: mode === 'light' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)',
        },
      },
    },
  },
});

export default getTheme('light');
