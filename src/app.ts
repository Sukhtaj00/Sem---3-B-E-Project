import express, { Express } from "express";


import gameRoutes from "../src/api/v1/routes/GameRoutes";
import matchRoutes from "../src/api/v1/routes/MatchRoutes";
import playerRoutes from "../src/api/v1/routes/PlayerRoutes";     

const app: Express = express();

interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}

app.use(express.json());

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


export default app;
