import { Router } from "express";
import {
    getAllMatches,
    createMatch,
    getMatchById,
    updateMatch,
    deleteMatch,
} from "../controllers/MatchController";

const router: Router = Router();
router.get("/", getAllMatches);
router.post("/", createMatch);
router.get("/:id", getMatchById);
router.put("/:id", updateMatch);
router.delete("/:id", deleteMatch);

export default router;