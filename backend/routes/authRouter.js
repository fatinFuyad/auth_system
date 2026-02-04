import express from "express";
import {
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
  verifyAuth,
  verifyEmail,
} from "../controllers/authController.js";

const router = express.Router();

// router.use(verifyAuth);
router.get("/verify-auth", verifyAuth);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);

export const authRouter = router;
