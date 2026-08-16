import { Navigate, Route, Routes } from "react-router-dom";
import {
  Announcements, Attendance, Auth, Calendar, Coaches, Dashboard, Equipment,
  Events, Fees, Forgot, FutureModule, Landing, MatchDetails, Matches,
  Notifications, PlayerProfile, Players, Profile, Reports, Settings, Teams
} from "./pages/AppPages";

const role = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user?.role === "viewer" ? "player" : user?.role || null;
  } catch {
    return null;
  }
};

export function ProtectedRoute({ children, roles }) {
  const token = localStorage.getItem("accessToken");
  const currentRole = role();

  if (!token || !currentRole) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(currentRole)) return <Navigate to="/dashboard" replace />;

  return children;
}

const guard = (element, roles) => (
  <ProtectedRoute roles={roles}>{element}</ProtectedRoute>
);

const ADMIN = ["admin"];
const ADMIN_COACH = ["admin", "coach"];
const MEMBER = ["admin", "coach", "player"];

export default function App() {
  return (
    <Routes>
      {/* Public / guest experience */}
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<Landing />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth mode="Create account" />} />
      <Route path="/forgot-password" element={<Forgot />} />
      <Route path="/reset-password" element={<Forgot reset />} />

      {/* Authenticated academy */}
      <Route path="/dashboard" element={guard(<Dashboard />, MEMBER)} />

      <Route path="/players" element={guard(<Players />, ADMIN_COACH)} />
      <Route path="/players/:id" element={guard(<PlayerProfile />, MEMBER)} />

      <Route path="/coaches" element={guard(<Coaches />, ADMIN_COACH)} />
      <Route path="/attendance" element={guard(<Attendance />, ADMIN_COACH)} />

      <Route path="/matches" element={guard(<Matches />, MEMBER)} />
      <Route path="/matches/:id" element={guard(<MatchDetails />, MEMBER)} />

      <Route path="/teams" element={guard(<Teams />, MEMBER)} />
      <Route path="/teams/:id" element={guard(<Teams />, MEMBER)} />

      <Route path="/events" element={guard(<Events />, MEMBER)} />
      <Route path="/announcements" element={guard(<Announcements />, MEMBER)} />
      <Route path="/notifications" element={guard(<Notifications />, MEMBER)} />

      <Route path="/equipment" element={guard(<Equipment />, ADMIN_COACH)} />
      <Route path="/fees" element={guard(<Fees />, MEMBER)} />
      <Route path="/calendar" element={guard(<Calendar />, MEMBER)} />
      <Route path="/reports" element={guard(<Reports />, ADMIN_COACH)} />

      {/* Intentionally deferred modules */}
      <Route path="/tournaments" element={guard(<FutureModule type="Tournaments" />, MEMBER)} />
      <Route path="/tournament" element={guard(<FutureModule type="Tournaments" />, MEMBER)} />
      <Route path="/statistics" element={guard(<FutureModule type="Statistics" />, MEMBER)} />
      <Route path="/live-scoring" element={guard(<FutureModule type="Live Scoring" />, MEMBER)} />
      <Route path="/offline-scoring" element={guard(<FutureModule type="Offline Scoring" />, MEMBER)} />
      <Route path="/analytics" element={guard(<FutureModule type="Advanced Analytics" />, MEMBER)} />

      <Route path="/profile" element={guard(<Profile />, MEMBER)} />
      <Route path="/settings" element={guard(<Settings />, MEMBER)} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
