import Joi from "joi";
import { RequestSchema } from "../middleware/validate";

/**
 * Game schema organized by request type
 */
export const gameSchemas: Record<string, RequestSchema> = {
    // POST /games
    create: {
        body: Joi.object({
            name: Joi.string().required().messages({
                "any.required": "Game name is required",
                "string.empty": "Game name cannot be empty",
            }),
            description: Joi.string().required().messages({
                "any.required": "Game description is required",
                "string.empty": "Game description cannot be empty",
            }),
            modes: Joi.string().required().messages({
                "any.required": "Game modes are required",
                "string.empty": "Game modes cannot be empty",
            }),
        }),
    },

    // PUT /games/:id
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Game ID is required",
                "string.empty": "Game ID cannot be empty",
            }),
        }),
        body: Joi.object({
            name: Joi.string().optional().messages({
                "string.empty": "Game name cannot be empty",
            }),
            description: Joi.string().optional().messages({
                "string.empty": "Game description cannot be empty",
            }),
            modes: Joi.string().optional().messages({
                "string.empty": "Game modes cannot be empty",
            }),
        }),
    },
};