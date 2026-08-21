import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: (payload) => api.post("/auth/login", payload),
  register: (payload) => api.post("/auth/register", payload),
  logout: (payload) => api.post("/auth/logout", payload),
  me: () => api.get("/auth/me"),
  updateMe: (payload) => api.put("/auth/me", payload),
  forgotPassword: (payload) => api.post("/auth/forgot-password", payload),
  resetPassword: (payload) => api.post("/auth/reset-password", payload),
  academyUsers: () => api.get("/auth/users"),
  setRole: (id, role) => api.patch(`/auth/users/${id}/role`, { role }),
};

export const playersService = {
  list: () => api.get("/players"),
  create: (payload) => api.post("/players", payload),
  get: (id) => api.get(`/players/${id}`),
  update: (id, payload) => api.put(`/players/${id}`, payload),
  remove: (id) => api.delete(`/players/${id}`),
};

export const teamsService = {
  list: () => api.get("/teams"),
  get: (id) => api.get(`/teams/${id}`),
  create: (payload) => api.post("/teams", payload),
  update: (id, payload) => api.put(`/teams/${id}`, payload),
  remove: (id) => api.delete(`/teams/${id}`),
};

export const matchesService = {
  list: () => api.get("/matches"),
  create: (payload) => api.post("/matches", payload),
  get: (id) => api.get(`/matches/${id}`),
};

export const scoringService = {
  start: (matchId) => api.post(`/scoring/${matchId}/start`),
  scoreBall: (matchId, payload) => api.post(`/scoring/${matchId}/ball`, payload),
};

export const attendanceService = {
  list: () => api.get("/attendance"),
  getByDate: (date) => api.get(`/attendance/${date}`),
  save: (payload) => api.post("/attendance", payload),
};

export const eventsService = { list: () => api.get("/events"), create: (payload) => api.post("/events", payload), update: (id, payload) => api.put(`/events/${id}`, payload), remove: (id) => api.delete(`/events/${id}`) };
export const announcementsService = { list: () => api.get("/announcements"), create: (payload) => api.post("/announcements", payload), update: (id, payload) => api.put(`/announcements/${id}`, payload), remove: (id) => api.delete(`/announcements/${id}`) };
export const equipmentService = { list: () => api.get("/equipment"), create: (payload) => api.post("/equipment", payload), update: (id, payload) => api.put(`/equipment/${id}`, payload), remove: (id) => api.delete(`/equipment/${id}`) };
export const notificationsService = { list: () => api.get("/notifications"), markRead: (id) => api.patch(`/notifications/${id}/read`), markAllRead: () => api.patch("/notifications/read-all") };
export const coachesService = { list: () => api.get("/coaches"), create: (payload) => api.post("/coaches", payload), update: (id,payload) => api.put(`/coaches/${id}`,payload), remove: id => api.delete(`/coaches/${id}`) };
export const feesService = { mine: () => api.get("/fees/me"), list: () => api.get("/fees"), create: payload => api.post("/fees",payload), update: (id,payload) => api.put(`/fees/${id}`,payload), remove: id => api.delete(`/fees/${id}`) };
export const reportsService = { academy: () => api.get("/reports/academy") };

export default api;
