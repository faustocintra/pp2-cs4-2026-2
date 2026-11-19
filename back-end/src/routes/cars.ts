import { Router } from "express";
import * as carController from "../controllers/car";

const router = Router();

router.get("/", carController.retrieveAll);
router.get("/:id", carController.retrieveOne);
router.post("/", carController.create);
router.put("/:id", carController.update);

export default router;