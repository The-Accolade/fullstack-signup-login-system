import express from "express";
import { registerUser, loginUser, getUser, getDashboard } from "../controllers/user.controllers.js";
import { authenticateJWT } from "../middlewares/token.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/user", getUser);
router.post("/login", loginUser);
router.get("/dashboard", authenticateJWT, getDashboard);

export default router;