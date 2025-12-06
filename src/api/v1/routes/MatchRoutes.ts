import { Router } from "express";
import * as matchController from "../controllers/MatchController";
import authenticate from "../middleware/authenticate";
import { matchSchemas } from "../validation/MatchValidation";
import { validateRequest } from "../middleware/validate";
import isAuthorized from "../middleware/authorize";
import { AuthorizationOptions } from "../models/authorizationOptions";

const router: Router = Router();

/**
 * @openapi
 * /matches:
 *   get:
 *     summary: Get all matches
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a list of matches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Match'
 *       401:
 *         description: Unauthorized - Authentication required
 *       500:
 *         description: Internal server error
 */
router.get("/", matchController.getAllMatches);

/**
 * @openapi
 * /matches:
 *   post:
 *     summary: Create a new match
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMatchRequest'
 *     responses:
 *       201:
 *         description: Match created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Match'
 *       400:
 *         description: Invalid payload or validation error
 *       401:
 *         description: Unauthorized - Authentication required
 *       403:
 *         description: Forbidden - Insufficient permissions (requires admin or manager role)
 *       404:
 *         description: Game or player not found
 *       500:
 *         description: Internal server error
 */
router.post(
    "/",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] } as AuthorizationOptions),    
    validateRequest(matchSchemas.create),
    matchController.createMatch
);

/**
 * @openapi
 * /matches/{id}:
 *   get:
 *     summary: Get match by ID
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the match
 *         schema:
 *           type: string
 *           example: "match-123"
 *     responses:
 *       200:
 *         description: Match data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Match'
 *       400:
 *         description: Invalid match ID format
 *       401:
 *         description: Unauthorized - Authentication required
 *       403:
 *         description: Forbidden - Insufficient permissions (requires admin or manager role)
 *       404:
 *         description: Match not found
 *       500:
 *         description: Internal server error
 */
router.get(
    "/:id", 
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] } as AuthorizationOptions),    
    validateRequest(matchSchemas.getMatchById),
    matchController.getMatchById
);

/**
 * @openapi
 * /matches/{id}:
 *   put:
 *     summary: Update an existing match
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the match to update
 *         schema:
 *           type: string
 *           example: "match-123"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMatchRequest'
 *     responses:
 *       200:
 *         description: Match updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Match'
 *       400:
 *         description: Invalid payload or validation error
 *       401:
 *         description: Unauthorized - Authentication required
 *       403:
 *         description: Forbidden - Insufficient permissions (requires admin or manager role)
 *       404:
 *         description: Match not found
 *       409:
 *         description: Conflict - Match cannot be updated
 *       500:
 *         description: Internal server error
 */
router.put(
    "/:id", 
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] } as AuthorizationOptions),    
    validateRequest(matchSchemas.update),
    matchController.updateMatch
);

/**
 * @openapi
 * /matches/{id}:
 *   delete:
 *     summary: Delete a match
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the match
 *         schema:
 *           type: string
 *           example: "match-123"
 *     responses:
 *       200:
 *         description: Match deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Match deleted successfully"
 *                 id:
 *                   type: string
 *                   example: "match-123"
 *       400:
 *         description: Invalid match ID format
 *       401:
 *         description: Unauthorized - Authentication required
 *       404:
 *         description: Match not found
 *       500:
 *         description: Internal server error
 */
router.delete(
    "/:id", 
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] } as AuthorizationOptions),
    matchController.deleteMatch
);

export default router;