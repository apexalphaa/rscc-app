import dotenv from "dotenv";

dotenv.config();

import http from "http";

import { Server } from "socket.io";

import app from "./app.js";

import connectDatabase from "./config/database.js";

const PORT = process.env.PORT || 5000;

connectDatabase();

const server = http.createServer(app);

const io = new Server(server, {

    cors: {

        origin: process.env.CLIENT_URL,

        credentials: true,

    },

});

app.set("io", io);

io.on("connection", (socket) => {

    console.log(

        "Client Connected",

        socket.id

    );

    socket.on("disconnect", () => {

        console.log(

            "Client Disconnected",

            socket.id

        );

    });

});

server.listen(PORT, () => {

    console.log(

        `Server Running On Port ${PORT}`

    );

});
