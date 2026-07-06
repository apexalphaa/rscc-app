import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

app.use(cors({

    origin: process.env.CLIENT_URL,

    credentials: true,

}));

app.use(express.json());

app.use(express.urlencoded({

    extended: true,

}));

app.use(cookieParser());

app.use(morgan("dev"));

app.get("/api/v1", (req, res) => {

    res.json({

        success: true,

        message: "RSCC API Running"

    });

});

export default app;
