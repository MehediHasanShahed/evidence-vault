import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import './globals.css';
import Providers from './providers';
import Sidebar from './components/Sidebar';
import Box from '@mui/material/Box';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata = {
  title: 'SentryLink Comply - Evidence Vault',
  description: 'Compliance evidence management for factories',
};

export default async function RootLayout({ children }) {
  // Read theme from cookie on server side to prevent flash
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get('themeMode');
  const initialTheme = themeCookie?.value === 'dark' ? 'dark' : 'light';

  // Set initial background color based on theme to prevent flash
  const initialBgColor = initialTheme === 'dark' ? '#0a1929' : '#f5f7fa';
  const initialTextColor = initialTheme === 'dark' ? '#fff' : '#000';

  return (
    <html
      lang="en"
      style={{
        backgroundColor: initialBgColor,
        colorScheme: initialTheme,
      }}
      suppressHydrationWarning
    >
      <body
        className={inter.className}
        style={{
          margin: 0,
          backgroundColor: initialBgColor,
          color: initialTextColor,
        }}
        suppressHydrationWarning
      >
        <Providers initialTheme={initialTheme}>
          <Box sx={{ display: "flex", minHeight: "100vh" }}>
            <Sidebar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                bgcolor: "background.default",
                minHeight: "100vh",
              }}
            >
              {children}
            </Box>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
