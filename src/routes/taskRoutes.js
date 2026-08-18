import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { create, list, remove, update } from "../controllers/taskController.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();
router.use(authMiddleware);

router.get("/", asyncHandler(list));
router.post("/", asyncHandler(create));
router.put("/:id", asyncHandler(update));
router.delete("/:id", asyncHandler(remove));

export default router;