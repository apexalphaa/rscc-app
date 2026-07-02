import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Players from "./pages/Players";
import Attendance from "./pages/Attendance";
import Matches from "./pages/Matches";
import Tournament from "./pages/Tournament";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/players" element={<Players />} />

      <Route path="/attendance" element={<Attendance />} />

      <Route path="/matches" element={<Matches />} />

      <Route path="/tournament" element={<Tournament />} />

      <Route path="/statistics" element={<Statistics />} />

      <Route path="/settings" element={<Settings />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
