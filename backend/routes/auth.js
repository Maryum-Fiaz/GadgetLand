// User Routes

import express from "express";
import { allUsers, deleteUser, forgotPassword, getUserProfile, loginUser, logout, registerUser, resetPassword, updatePassword, updateProfile } from "../controllers/authControllers.js";
import { authorizeRoles, isAuthenticatedUser } from '../middleware/auth.js'

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

// Admin
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin") ,allUsers);

router
  .route("/admin/users/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

export default router;