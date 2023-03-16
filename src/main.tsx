import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { RoutesTree } from "./routes";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#fff",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "#db3131",
          "&$error": {
            color: "#db3131",
          },
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RoutesTree />
    </ThemeProvider>
  </React.StrictMode>
);
