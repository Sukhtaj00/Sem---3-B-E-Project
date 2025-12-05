import Joi from "joi";
import { RequestSchema } from "../middleware/validate";

/**
 * Player schema organized by request type
 */
export const playerSchemas: Record<string, RequestSchema> = {
    // POST /players
    create: {
        body: Joi.object({
            username: Joi.string().required().messages({
                "any.required": "Username is required",
                "string.empty": "Username cannot be empty",
            }),
            achievements: Joi.string().optional().default(""),
            totalGamesPlayed: Joi.number().integer().min(0).optional().default(0),
        }),
    },

    // PUT /players/:id
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Player ID is required",
                "string.empty": "Player ID cannot be empty",
            }),
        }),
        body: Joi.object({
            username: Joi.string().optional().messages({
                "string.empty": "Username cannot be empty",
            }),
            achievements: Joi.string().optional(),
            totalGamesPlayed: Joi.number().integer().min(0).optional(),
        }),
    },
};