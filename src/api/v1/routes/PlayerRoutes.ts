import { Router } from "express";
import {
    getAllPlayers,
    createPlayer,
    getPlayerById,
    updatePlayer,
    deletePlayer,
} from "../controllers/PlayerController";

const router: Router = Router();
router.get("/", getAllPlayers);
router.post("/", createPlayer);
router.get("/:id", getPlayerById);
router.put("/:id", updatePlayer);
router.delete("/:id", deletePlayer);

export default router;