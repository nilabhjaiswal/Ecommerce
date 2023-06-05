import express from "express";
import {
  deleteUser,
  forgotPassword,
  getAllUsers,
  getSingleUser,
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updatePassword,
  updateUserProfile,
  updateUserRole,
} from "../controller/userController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

// REGISTER USER
router.route("/register").post(registerUser);
// LOGIN USER
router.route("/login").post(loginUser);
// FORGOT PASSWORD
router.route("/password/forgot").post(forgotPassword);
// RESET PASSWORD
router.route("/password/reset/:token").put(resetPassword);
// LOGOUT USER
router.route("/logout").get(logoutUser);
// GET ALL USER DETAILS
router.route("/me").get(isAuthenticatedUser, getUserDetails);
// UPDATE PASSWORD
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
// UPDATE PROFILE
router.route("/me/update").put(isAuthenticatedUser, updateUserProfile);
// GET ALL USER
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
// // GET SINGLE USER
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"),updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"),deleteUser);

export default router;
