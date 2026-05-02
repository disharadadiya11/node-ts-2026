import express from "express";
import { register, update, login, deleteUser, get, getAll } from "../controllers/user.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/:id", update);
router.delete("/:id", deleteUser);
router.get("/:id", get);
router.get("/", getAll);

export default router;
