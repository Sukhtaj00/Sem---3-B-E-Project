import express, { Express } from "express";
 

const app: Express = express();
 
// Interface for health check response
interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}
 
app.use(express.json());
 
// Base test route
app.get("/", (req,res) => {
    res.send("Welcome to SupperMart");
})
 
// Health check route to return service status
app.get("/api/v1/health", (req, res) => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };
    res.json(healthData);
})
 
//Export the app instance to be used in server.ts
export default app;