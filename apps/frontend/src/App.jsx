import { Route, Routes } from "react-router-dom";
import { Announcements, Attendance, Auth, Calendar, Coaches, Dashboard, Equipment, Events, Fees, Forgot, FutureModule, Landing, MatchDetails, Matches, Notifications, PlayerProfile, Players, Profile, Reports, Settings, Teams } from "./pages/AppPages";

export default function App() {
  return <Routes>
    <Route path="/" element={<Landing/>}/>
    <Route path="/about" element={<Landing/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/players" element={<Players/>}/><Route path="/players/:id" element={<PlayerProfile/>}/>
    <Route path="/attendance" element={<Attendance/>}/>
    <Route path="/matches" element={<Matches/>}/><Route path="/matches/:id" element={<MatchDetails/>}/>
    <Route path="/teams" element={<Teams/>}/><Route path="/teams/:id" element={<Teams/>}/>
    <Route path="/events" element={<Events/>}/><Route path="/announcements" element={<Announcements/>}/>
    <Route path="/equipment" element={<Equipment/>}/><Route path="/notifications" element={<Notifications/>}/>
    <Route path="/fees" element={<Fees/>}/><Route path="/calendar" element={<Calendar/>}/><Route path="/coaches" element={<Coaches/>}/><Route path="/reports" element={<Reports/>}/>
    <Route path="/tournaments" element={<FutureModule type="Tournaments"/>}/><Route path="/tournament" element={<FutureModule type="Tournaments"/>}/>
    <Route path="/statistics" element={<FutureModule type="Statistics"/>}/>
    <Route path="/profile" element={<Profile/>}/><Route path="/settings" element={<Settings/>}/>
    <Route path="/login" element={<Auth/>}/><Route path="/register" element={<Auth mode="Create account"/>}/><Route path="/forgot-password" element={<Forgot/>}/><Route path="/reset-password" element={<Forgot reset/>}/>
    <Route path="*" element={<Landing/>}/>
  </Routes>;
}
