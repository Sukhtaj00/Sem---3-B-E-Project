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
 *     responses:
 *       200:
 *         description: Returns a list of players
 */
router.get("/", playerController.getAllPlayers);

/**
 * @openapi
 * /players:
 *   post:
 *     summary: Create a new player
 *     tags: [Players]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *                 example: "gamer123"
 *               achievements:
 *                 type: string
 *                 example: "First Win, High Score Champion"
 *               totalGamesPlayed:
 *                 type: number
 *                 example: 0
 *     responses:
 *       201:
 *         description: Player created
 *       400:
 *         description: Invalid payload
 */
router.post(
    "/", 
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] } as AuthorizationOptions),    
    validateRequest(playerSchemas.create),
    playerController.createPlayer);

/**
 * @openapi
 * /players/{id}:
 *   get:
 *     summary: Get player by ID
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the player
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Player data
 *       404:
 *         description: Player not found
 */
router.get(
    "/:id", 
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] } as AuthorizationOptions),    
    validateRequest(playerSchemas.getPlayerById),
    playerController.getPlayerById);

/**
 * @openapi
 * /players/{id}:
 *   put:
 *     summary: Update an existing player
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the player to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "proGamer123"
 *               achievements:
 *                 type: string
 *                 example: "First Win, High Score Champion, Speed Runner"
 *               totalGamesPlayed:
 *                 type: number
 *                 example: 25
 *     responses:
 *       200:
 *         description: Player updated
 *       404:
 *         description: Player not found
 */
router.put(
    "/:id", 
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] } as AuthorizationOptions),    
    validateRequest(playerSchemas.update),
    playerController.updatePlayer);

/**
 * @openapi
 * /players/{id}:
 *   delete:
 *     summary: Delete a player
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the player
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Player deleted
 *       404:
 *         description: Player not found
 */
router.delete(
    "/:id", 
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] } as AuthorizationOptions),    
    validateRequest(playerSchemas.delete),
    playerController.deletePlayer);

export default router;