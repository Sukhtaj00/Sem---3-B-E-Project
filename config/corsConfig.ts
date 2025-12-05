import { CorsOptions } from "cors";

export const getCorsConfig = (): CorsOptions => {
    const isDevelopment: boolean = process.env.NODE_ENV === "development";

    if (isDevelopment) {
        // allow all origins in development for easy testing
        return {
            origin: true,
            credentials: true,
        } as CorsOptions;
    }

    // we'll be more strict outside of development
    return {
        origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    } as CorsOptions;
};