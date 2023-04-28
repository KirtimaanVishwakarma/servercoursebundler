import express from "express";
import {
  addToPlayList,
  changePassword,
  deleteMyProfile,
  deleteUser,
  forgetPassword,
  getAllUsers,
  getMtProfile,
  login,
  logout,
  register,
  removeFromPlayList,
  resetPassword,
  updateProfile,
  updateProfilePicture,
  updateUserRole,
} from "../controllers/userController.js";
import { authorizedAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

// To register a new user
router.route("/register").post(singleUpload, register);

// login
router.route("/login").post(login);

// logout
router.route("/logout").get(logout);

// Get my profile
router.route("/me").get(isAuthenticated, getMtProfile);

// Delete my profile
router.route("/me").delete(isAuthenticated, deleteMyProfile);

// changePassword
router.route("/changepassword").put(isAuthenticated, changePassword);

// Update profile
router.route("/updateprofile").put(isAuthenticated, updateProfile);

// Update Profile Picture
router
  .route("/updateprofilepicture")
  .put(isAuthenticated, singleUpload, updateProfilePicture);

// ForgetPassword
router.route("/forgetpassword").post(forgetPassword);

// Reset ForgetPassword
router.route("/resetpassword/:token").put(resetPassword);

// Add to Playlist
router.route("/addtoplaylist").post(isAuthenticated, addToPlayList);

// Remove from playlist
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlayList);

// <==========================   ADMIN ROUTES    ===============================>

//Get all users
router.route("/admin/users").get(isAuthenticated, authorizedAdmin, getAllUsers);

// Update user role
router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizedAdmin, updateUserRole)
  .delete(isAuthenticated, authorizedAdmin, deleteUser);

export default router;
