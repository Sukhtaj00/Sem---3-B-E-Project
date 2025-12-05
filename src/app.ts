import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config()

import gameRoutes from "../src/api/v1/routes/GameRoutes";
import matchRoutes from "../src/api/v1/routes/MatchRoutes";
import playerRoutes from "../src/api/v1/routes/PlayerRoutes";
import errorHandler from "./api/v1/middleware/errorHandler";
import userRoutes from "./api/v1/routes/userRoutes";
import adminRoutes from "../src/api/v1/routes/adminRoutes"   
import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";

const app: Express = express();

interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}

app.use(express.json());

app.use(accessLogger);
app.use(errorLogger);
app.use(consoleLogger);

app.get("/", (req, res) => {
    res.send("Welcome to SupperMart");
});

app.get("/api/v1/health", (req, res) => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };
    res.json(healthData);
});


app.use("/api/v1/games", gameRoutes);
app.use("/api/v1/matches", matchRoutes); 
app.use("/api/v1/players", playerRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);

// global error handling middleware that must be applied last
app.use(errorHandler)


export default app;
