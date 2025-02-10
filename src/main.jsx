import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/Main/App.jsx";
import Generator from "./pages/Generator/Generator.tsx";
import { HashRouter, Routes, Route } from "react-router";
import Login from "./pages/Login/Login.tsx";
import Settings from "./pages/Settings/Settings.tsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter type="slash">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create-cv" element={<Generator />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-settings" element={<Settings />} />
        <Route path="*" element={<App />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
