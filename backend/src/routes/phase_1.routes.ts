import { Router } from "express";
import { AntesDeController } from "../modules/phase_one/antesDe/antesDe.controller";

const router = Router();

router.get("/:id", AntesDeController.getMessage);
router.put("/updatePhase", AntesDeController.updatedStage)
router.put("/updatedStrategy", AntesDeController.updatedStrategy)

export default router;