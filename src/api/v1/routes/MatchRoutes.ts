import { Router } from "express";
import * as matchController from "../controllers/MatchController";
import authenticate from "../middleware/authenticate";
import { matchSchemas } from "../validation/MatchValidation";
import { validateRequest } from "../middleware/validate";

const router: Router = Router();

/**
 * @openapi
 * /matches:
 *   get:
 *     summary: Get all matches
 *     tags: [Matches]
 *     responses:
 *       200:
 *         description: Returns a list of matches
 */
router.get("/", matchController.getAllMatches);

/**
 * @openapi
 * /matches:
 *   post:
 *     summary: Create a new match
 *     tags: [Matches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gameId
 *               - playerId
 *               - score
 *             properties:
 *               gameId:
 *                 type: string
 *                 example: "game123"
 *               playerId:
 *                 type: string
 *                 example: "player456"
 *               score:
 *                 type: number
 *                 example: 1500
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-15T10:30:00Z"
 *     responses:
 *       201:
 *         description: Match created
 *       400:
 *         description: Invalid payload
 */
router.post(
    "/",
    authenticate,
    validateRequest(matchSchemas.create),
    matchController.createMatch);

/**
 * @openapi
 * /matches/{id}:
 *   get:
 *     summary: Get match by ID
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the match
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Match data
 *       404:
 *         description: Match not found
 */
router.get(
    "/:id", 
    authenticate,
    validateRequest(matchSchemas.getMatchById),
    matchController.getMatchById);

/**
 * @openapi
 * /matches/{id}:
 *   put:
 *     summary: Update an existing match
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the match to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gameId:
 *                 type: string
 *                 example: "game123"
 *               playerId:
 *                 type: string
 *                 example: "player456"
 *               score:
 *                 type: number
 *                 example: 1800
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-15T11:30:00Z"
 *     responses:
 *       200:
 *         description: Match updated
 *       404:
 *         description: Match not found
 */
router.put(
    "/:id", 
    authenticate,
    validateRequest(matchSchemas.update),
    matchController.updateMatch);

/**
 * @openapi
 * /matches/{id}:
 *   delete:
 *     summary: Delete a match
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the match
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Match deleted
 *       404:
 *         description: Match not found
 */
router.delete(
    "/:id", 
    authenticate,
    validateRequest(matchSchemas.delete),
    matchController.deleteMatch);

export default router;