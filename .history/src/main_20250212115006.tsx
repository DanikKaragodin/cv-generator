import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HashRouter } from "react-router";
import { theme } from "@themes/theme.tsx";
import { ThemeProvider } from "@mui/material/styles";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider theme={theme}>
        <App></App>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>
);