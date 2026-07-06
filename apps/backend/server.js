import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import connectDatabase from "./config/database.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
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

    server.listen(PORT, () => {
      console.log("======================================");
      console.log(`🚀 RSCC Backend Running`);
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
