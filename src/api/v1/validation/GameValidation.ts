import Joi from "joi";
import { RequestSchema } from "../middleware/validate";

/**
 * @openapi
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - description
 *         - modes
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for a Game
 *           example: "game123"
 *         name:
 *           type: string
 *           description: The name of the Game
 *           example: "Space Invaders"
 *         description:
 *           type: string
 *           description: The description of the Game
 *           example: "Classic arcade space shooting game"
 *         modes:
 *           type: string
 *           description: The available game modes
 *           example: "Single Player, Multiplayer"
 *     GameInput:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - modes
 *       properties:
 *         name:
 *           type: string
 *           example: "Space Invaders"
 *         description:
 *           type: string
 *           example: "Classic arcade space shooting game"
 *         modes:
 *           type: string
 *           example: "Single Player, Multiplayer"
 */

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