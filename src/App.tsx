import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme";
import { UsersPage } from "./pages";

/**
 * Root application component
 * Sets up MUI theme and renders the users page
 */
function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UsersPage />
    </ThemeProvider>
  );
}

export default App;
