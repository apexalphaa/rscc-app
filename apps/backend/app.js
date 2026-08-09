import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import testRoutes from "./routes/test.routes.js";
import teamRoutes from "./routes/team.routes.js";
import matchRoutes from "./routes/match.routes.js";
import matchSetupRoutes from "./routes/matchSetup.routes.js";
import scoringRoutes from "./routes/scoring.routes.js";
import playerRoutes from "./routes/player.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import equipmentRoutes from "./routes/equipment.routes.js";
import tournamentRoutes from "./routes/tournament.routes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    application: "RSCC Backend",
    version: "1.0.0",
    status: "Running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "Healthy",
    uptime: process.uptime(),
  });
});

app.get("/api/v1", (req, res) => {
  res.json({
    success: true,
    message: "RSCC API Running",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/teams", teamRoutes);
app.use("/api/v1/matches", matchRoutes);
app.use("/api/v1/match-setup", matchSetupRoutes);
app.use("/api/v1/scoring", scoringRoutes);
app.use("/api/v1/players", playerRoutes);
app.use("/api/v1/attendance", attendanceRoutes);
app.use("/api/v1/equipment", equipmentRoutes);
app.use("/api/v1/tournaments", tournamentRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
