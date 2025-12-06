import rateLimit from "express-rate-limit";
 
/**
 * This is the API rate limiter
 * This will limit 100 request per 15min
 */
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1,
    standardHeaders: true,
    legacyHeaders: false
});