import Dashboard from "./pages/Dashboard/Dashboard";
import Generator from "./pages/Generator/Generator";
import Login from "./pages/Login/Login";
import Settings from "./pages/Settings/Settings";
import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-cv" element={<Generator />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-settings" element={<Settings />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
