import express from "express";
import {
  checkAuth,
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  verifyEmail,
} from "../controllers/auth.controller";
import { authenticateToken } from "../middleware/authenticateToken";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticateToken, logout);
router.get("/check", authenticateToken, checkAuth);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/verify-email", verifyEmail);

export default router;
