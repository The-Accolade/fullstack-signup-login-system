import express from "express";
import { registerUser, loginUser, getUser } from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/user", getUser);
router.post("/login", loginUser);

export default router;