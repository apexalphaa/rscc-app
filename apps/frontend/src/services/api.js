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
  create: (payload) => api.post("/teams", payload),
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

export default api;
