import Joi from "joi";
import { RequestSchema } from "../middleware/validate";

/**
 * Match schema organized by request type
 */
export const matchSchemas: Record<string, RequestSchema> = {
    // POST /matches
    create: {
        body: Joi.object({
            gameId: Joi.string().required().messages({
                "any.required": "Game ID is required",
                "string.empty": "Game ID cannot be empty",
            }),
            playerId: Joi.string().required().messages({
                "any.required": "Player ID is required",
                "string.empty": "Player ID cannot be empty",
            }),
            score: Joi.number().integer().min(0).required().messages({
                "any.required": "Score is required",
                "number.base": "Score must be a number",
                "number.min": "Score must be 0 or more",
            }),
            timestamp: Joi.date().optional().default(() => new Date()),
        }),
    },

    // PUT /matches/:id
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Match ID is required",
                "string.empty": "Match ID cannot be empty",
            }),
        }),
        body: Joi.object({
            gameId: Joi.string().optional().messages({
                "string.empty": "Game ID cannot be empty",
            }),
            playerId: Joi.string().optional().messages({
                "string.empty": "Player ID cannot be empty",
            }),
            score: Joi.number().integer().min(0).optional(),
            timestamp: Joi.date().optional(),
        }),
    },
};