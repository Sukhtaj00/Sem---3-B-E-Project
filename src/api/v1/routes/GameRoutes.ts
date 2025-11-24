import express from "express";
import {
    getAllGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame,
} from "../controllers/GameController";

const router = express.Router();

/**
 * @openapi
 * /games:
 *   get:
 *     summary: Get all games
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: Returns a list of games
 */
router.get("/", getAllGames);

/**
 * @openapi
 * /games/{id}:
 *   get:
 *     summary: Get game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the game
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Game data
 *       404:
 *         description: Game not found
 */
router.get("/:id", getGameById);

/**
 * @openapi
 * /games:
 *   post:
 *     summary: Create a new game
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - modes
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Space Invaders"
 *               description:
 *                 type: string
 *                 example: "Classic arcade space shooting game"
 *               modes:
 *                 type: string
 *                 example: "Single Player, Multiplayer"
 *     responses:
 *       201:
 *         description: Game created
 *       400:
 *         description: Invalid payload
 */
router.post("/", createGame);

/**
 * @openapi
 * /games/{id}:
 *   put:
 *     summary: Update an existing game
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the game to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Space Invaders Deluxe"
 *               description:
 *                 type: string
 *                 example: "Enhanced version of classic arcade game"
 *               modes:
 *                 type: string
 *                 example: "Single Player, Multiplayer, Challenge"
 *     responses:
 *       200:
 *         description: Game updated
 *       404:
 *         description: Game not found
 */
router.put("/:id", updateGame);

/**
 * @openapi
 * /games/{id}:
 *   delete:
 *     summary: Delete a game
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the game
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Game deleted
 *       404:
 *         description: Game not found
 */
router.delete("/:id", deleteGame);

export default router;