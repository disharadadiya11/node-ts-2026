import express from "express";
import { add, update, deleteTask, get, getAll } from "../controllers/task.controller";

const router = express.Router();

router.post("/", add);
router.put("/:id", update);
router.delete("/:id", deleteTask);
router.get("/:id", get);
router.get("/", getAll);

export default router;
