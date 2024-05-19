// eslint-disable-next-line import/no-extraneous-dependencies
import { ThemeProvider, createTheme } from '@arcblock/ux/lib/Theme';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createAuthServiceSessionContext } from '@arcblock/did-connect/lib/Session';
import Home from './pages/home';

const { SessionProvider } = createAuthServiceSessionContext();

const theme = createTheme();
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider>
        <Home />
      </SessionProvider>
    </ThemeProvider>
  );
}
