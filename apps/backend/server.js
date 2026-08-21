import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import connectDatabase from "./config/database.js";
import { sendFeeReminders } from "./services/feeReminder.service.js";

const PORT = Number(process.env.PORT || 5000);
const HOST = process.env.HOST || "0.0.0.0";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log(`Client Connected : ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Client Disconnected : ${socket.id}`);
  });
});

const startServer = async () => {
  try {
    await connectDatabase();

    await sendFeeReminders().catch((error) => console.error("Initial fee reminder check failed", error));
    setInterval(() => sendFeeReminders().catch((error) => console.error("Fee reminder check failed", error)), 6 * 60 * 60 * 1000);

    server.listen(PORT, HOST, () => {
      console.log("======================================");
      console.log("🚀 RSCC Backend Running");
      console.log(`🌐 Host : ${HOST}`);
      console.log(`🌐 Port : ${PORT}`);
      console.log(`📦 Environment : ${process.env.NODE_ENV || "development"}`);
      console.log("======================================");
    });
  } catch (error) {
    console.error("Failed to start server");
    console.error(error);
    process.exit(1);
  }
};

startServer();
