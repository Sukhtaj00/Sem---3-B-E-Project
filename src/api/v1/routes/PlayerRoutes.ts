import { Router } from "express";
import * as playerController from "../controllers/PlayerController";
import authenticate from "../middleware/authenticate";
import { playerSchemas } from "../validation/PlayerValidation";
import { validateRequest } from "../middleware/validate";
import isAuthorized from "../middleware/authorize";
import { AuthorizationOptions } from "../models/authorizationOptions";

const router: Router = Router();

/**
 * @openapi
 * /players:
 *   get:
 *     summary: Get all players
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a list of players
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 *       401:
 *         description: Unauthorized - Authentication required
 *       500:
 *         description: Internal server error
 */
router.get("/", playerController.getAllPlayers);

/**
 * @openapi
 * /players:
 *   post:
 *     summary: Create a new player
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePlayerRequest'
 *     responses:
 *       201:
 *         description: Player created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       400:
 *         description: Invalid payload or validation error
 *       401:
 *         description: Unauthorized - Authentication required
 *       403:
 *         description: Forbidden - Insufficient permissions (requires admin or manager role)
 *       409:
 *         description: Player with this username already exists
 *       500:
 *         description: Internal server error
 */
router.post(
    "/", 
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] } as AuthorizationOptions),    
    validateRequest(playerSchemas.create),
    playerController.createPlayer
);

/**
 * @openapi
 * /players/{id}:
 *   get:
 *     summary: Get player by ID
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the player
 *         schema:
 *           type: string
 *           example: "player-123"
 *     responses:
 *       200:
 *         description: Player data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       400:
 *         description: Invalid player ID format
 *       401:
 *         description: Unauthorized - Authentication required
 *       403:
 *         description: Forbidden - Insufficient permissions (requires admin or manager role)
 *       404:
 *         description: Player not found
 *       500:
 *         description: Internal server error
 */
router.get(
    "/:id", 
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] } as AuthorizationOptions),    
    validateRequest(playerSchemas.getPlayerById),
    playerController.getPlayerById
);

/**
 * @openapi
 * /players/{id}:
 *   put:
 *     summary: Update an existing player
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the player to update
 *         schema:
 *           type: string
 *           example: "player-123"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePlayerRequest'
 *     responses:
 *       200:
 *         description: Player updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       400:
 *         description: Invalid payload or validation error
 *       401:
 *         description: Unauthorized - Authentication required
 *       403:
 *         description: Forbidden - Insufficient permissions (requires admin or manager role)
 *       404:
 *         description: Player not found
 *       409:
 *         description: Player with this username already exists
 *       500:
 *         description: Internal server error
 */
router.put(
    "/:id", 
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] } as AuthorizationOptions),    
    validateRequest(playerSchemas.update),
    playerController.updatePlayer
);

/**
 * @openapi
 * /players/{id}:
 *   delete:
 *     summary: Delete a player
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the player
 *         schema:
 *           type: string
 *           example: "player-123"
 *     responses:
 *       200:
 *         description: Player deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Player deleted successfully"
 *                 id:
 *                   type: string
 *                   example: "player-123"
 *       400:
 *         description: Invalid player ID format
 *       401:
 *         description: Unauthorized - Authentication required
 *       403:
 *         description: Forbidden - Insufficient permissions (requires admin or manager role)
 *       404:
 *         description: Player not found
 *       500:
 *         description: Internal server error
 */
router.delete(
    "/:id", 
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] } as AuthorizationOptions),    
    validateRequest(playerSchemas.delete),
    playerController.deletePlayer
);

export default router;