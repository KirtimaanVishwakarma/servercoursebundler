import express from "express";
import { authorizedAdmin, isAuthenticated } from "../middlewares/auth.js";
import {
  adminDashboardStats,
  contact,
  courseRequest,
} from "../controllers/otherController.js";

const router = express.Router();

// Contact form
router.route("/contact").post(contact);

// Course request
router.route("/courserequest").post(courseRequest);

// get admin Dashboard Stats
router
  .route("/admin/stats")
  .get(isAuthenticated, authorizedAdmin, adminDashboardStats);

export default router;
