/*import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import testRoutes from "./routes/test.routes.js";
import teamRoutes from "./routes/team.routes.js";
import matchRoutes from "./routes/match.routes.js";
import matchSetupRoutes from "./routes/matchSetup.routes.js";

const app=express();

app.use(cors({
origin:process.env.CLIENT_URL,
credentials:true,
}));

app.use(express.json());

app.use(express.urlencoded({
extended:true,
}));

app.use(cookieParser());

app.use(morgan("dev"));

app.get("/",(req,res)=>{

res.json({

success:true,

application:"RSCC Backend",

version:"1.0.0",

status:"Running",

timestamp:new Date().toISOString(),

});

});

app.get("/health",(req,res)=>{

res.json({

success:true,

status:"Healthy",

uptime:process.uptime(),

});

});

app.get("/api/v1",(req,res)=>{

res.json({

success:true,

message:"RSCC API Running",

});

});

app.use("/api/v1/auth",authRoutes);

app.use("/api/v1/test",testRoutes);

app.use("/api/v1/teams",teamRoutes);

app.use("/api/v1/matches",matchRoutes);

app.use("/api/v1/match-setup",matchSetupRoutes);

app.use((req,res)=>{

res.status(404).json({

success:false,

message:"Route Not Found",

});

});

export default app;
*/
const express = require("express");
const path = require("path");

const registerMiddlewares = require("./utils/registerMiddlewares");
const registerRoutes = require("./utils/registerRoutes");

const app = express();

registerMiddlewares(app);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

registerRoutes(app);

module.exports = app;
