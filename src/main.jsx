import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Generator from "./Generator.jsx";
import { HashRouter, Routes, Route } from "react-router";
import Login from "./Login.jsx";
import Settings from "./Settings.jsx";
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
