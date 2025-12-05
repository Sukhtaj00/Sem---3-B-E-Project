import Joi from "joi";
import { RequestSchema } from "../middleware/validate";

/**
 * @openapi
 * components:
 *   schemas:
 *     Match:
 *       type: object
 *       required:
 *         - id
 *         - gameId
 *         - playerId
 *         - score
 *         - timestamp
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for a Match
 *           example: "match123"
 *         gameId:
 *           type: string
 *           description: The ID of the game played
 *           example: "game123"
 *         playerId:
 *           type: string
 *           description: The ID of the player
 *           example: "player456"
 *         score:
 *           type: number
 *           description: The score achieved in the match
 *           example: 1500
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: When the match was played
 *           example: "2024-01-15T10:30:00Z"
 *     MatchInput:
 *       type: object
 *       required:
 *         - gameId
 *         - playerId
 *         - score
 *       properties:
 *         gameId:
 *           type: string
 *           example: "game123"
 *         playerId:
 *           type: string
 *           example: "player456"
 *         score:
 *           type: number
 *           example: 1500
 *         timestamp:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T10:30:00Z"
 */

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