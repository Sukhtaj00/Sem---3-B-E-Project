import Joi from "joi";
import { RequestSchema } from "../middleware/validate";

/**
 * @openapi
 * components:
 *   schemas:
 *     Player:
 *       type: object
 *       required:
 *         - id
 *         - username
 *         - achievements
 *         - totalGamesPlayed
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for a Player
 *           example: "player123"
 *         username:
 *           type: string
 *           description: The username of the Player
 *           example: "gamer123"
 *         achievements:
 *           type: string
 *           description: The player's achievements
 *           example: "First Win, High Score Champion"
 *         totalGamesPlayed:
 *           type: number
 *           description: Total number of games played
 *           example: 25
 *     PlayerInput:
 *       type: object
 *       required:
 *         - username
 *       properties:
 *         username:
 *           type: string
 *           example: "gamer123"
 *         achievements:
 *           type: string
 *           example: "First Win"
 *         totalGamesPlayed:
 *           type: number
 *           example: 0
 */

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