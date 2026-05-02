import express from "express";
import {
  add,
  update,
  deleteTask,
  get,
  getAll,
} from "../controllers/task.controller";

const router = express.Router();

router.post("/add", add);
router.put("/update/:id", update);
router.delete("/delete/:id", deleteTask);
router.get("/get/:id", get);
router.get("/get-all", getAll);

export default router;
