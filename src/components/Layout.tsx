import { ReactNode } from "react";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";

interface LayoutProps {
  children: ReactNode;
}

/**
 * Main app layout with header and responsive container
 */
export function Layout({ children }: LayoutProps): React.JSX.Element {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        }}
      >
        <Toolbar>
          <PeopleIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="h1" sx={{ fontWeight: 600 }}>
            User Management
          </Typography>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          py: 4,
        }}
      >
        {children}
      </Container>

      <Box
        component="footer"
        sx={{
          py: 2,
          textAlign: "center",
          bgcolor: "background.paper",
          borderTop: 1,
          borderColor: "divider",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} User CRUD App
        </Typography>
      </Box>
    </Box>
  );
}
