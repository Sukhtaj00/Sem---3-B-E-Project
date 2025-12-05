import express from "express";
import * as gameController from "../controllers/GameController";
import authenticate from "../middleware/authenticate";
import { gameSchemas } from "../validation/GameValidation";
import { validateRequest } from "../middleware/validate";
import isAuthorized from "../middleware/authorize";
import { AuthorizationOptions } from "../models/authorizationOptions";

const router = express.Router();

/**
 * @openapi
 * /games:
 *   get:
 *     summary: Get all games
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a list of games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 *       401:
 *         description: Unauthorized - Authentication required
 *       500:
 *         description: Internal server error
 */
router.get("/", gameController.getAllGames);

/**
 * @openapi
 * /games/{id}:
 *   get:
 *     summary: Get game by ID
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the game
 *         schema:
 *           type: string
 *           example: "game-123"
 *     responses:
 *       200:
 *         description: Game data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       400:
 *         description: Invalid game ID format
 *       401:
 *         description: Unauthorized - Authentication required
 *       404:
 *         description: Game not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", gameController.getGameById);

/**
 * @openapi
 * /games:
 *   post:
 *     summary: Create a new game
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateGameRequest'
 *     responses:
 *       201:
 *         description: Game created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       400:
 *         description: Invalid payload or validation error
 *       401:
 *         description: Unauthorized - Authentication required
 *       403:
 *         description: Forbidden - Insufficient permissions (requires admin or manager role)
 *       409:
 *         description: Game with this name already exists
 *       500:
 *         description: Internal server error
 */
router.post(
    "/", 
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] } as AuthorizationOptions),    
    validateRequest(gameSchemas.create),
    gameController.createGame
);

/**
 * @openapi
 * /games/{id}:
 *   put:
 *     summary: Update an existing game
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the game to update
 *         schema:
 *           type: string
 *           example: "game-123"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateGameRequest'
 *     responses:
 *       200:
 *         description: Game updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       400:
 *         description: Invalid payload or validation error
 *       401:
 *         description: Unauthorized - Authentication required
 *       403:
 *         description: Forbidden - Insufficient permissions (requires admin or manager role)
 *       404:
 *         description: Game not found
 *       409:
 *         description: Game with this name already exists
 *       500:
 *         description: Internal server error
 */
router.put(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] } as AuthorizationOptions),    
    validateRequest(gameSchemas.update),
    gameController.updateGame
);

/**
 * @openapi
 * /games/{id}:
 *   delete:
 *     summary: Delete a game
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the game
 *         schema:
 *           type: string
 *           example: "game-123"
 *     responses:
 *       200:
 *         description: Game deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Game deleted successfully"
 *                 id:
 *                   type: string
 *                   example: "game-123"
 *       400:
 *         description: Invalid game ID format
 *       401:
 *         description: Unauthorized - Authentication required
 *       403:
 *         description: Forbidden - Insufficient permissions (requires admin or manager role)
 *       404:
 *         description: Game not found
 *       500:
 *         description: Internal server error
 */
router.delete(
    "/:id", 
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] } as AuthorizationOptions),    
    validateRequest(gameSchemas.delete),
    gameController.deleteGame
);

export default router;