import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { generateSwaggerSpec } from "./swaggerOptions";
 
export const setupSwagger = (app: Express): void => {
    const Swaggerspecs = generateSwaggerSpec();
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(Swaggerspecs));
};
 
export default setupSwagger;