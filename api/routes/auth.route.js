import express from "express";
import { registerUser, loginUser, getUser } from "../controllers/user.controllers.js";
import { authenticateJWT } from "../middlewares/token.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/user", authenticateJWT, getUser);
router.post("/login", loginUser);
// router.get("/dashboard", getDashboard);

export default router;