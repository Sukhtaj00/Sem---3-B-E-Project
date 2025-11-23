import { Router } from "express";
import {
    getAllGames,
    createGame,
    getGameById,
    updateGame,
    deleteGame,
} from "../controllers/GameController";

const router: Router = Router();
router.get("/", getAllGames);
router.post("/", createGame);
router.get("/:id", getGameById);
router.put("/:id", updateGame);
router.delete("/:id", deleteGame);

export default router;