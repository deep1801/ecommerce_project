import express from "express";

import {
  signupUser,
  loginUser,
  verifyOtp,
  resendOtp,
  getUserProfile,
  logoutUser,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// TEST

router.get("/test", (req, res) => {
  res.send("Auth Test Working");
});

// AUTH

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.post("/verify-otp", verifyOtp);

router.post("/resend-otp", resendOtp);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// PROFILE

router.get("/profile", authMiddleware, getUserProfile);

// LOGOUT

router.post("/logout", logoutUser);

export default router;
