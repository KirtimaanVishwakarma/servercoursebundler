import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  buySubscription,
  cancelSubscription,
  getRazorPayKey,
  paymentVarification,
} from "../controllers/paymentController.js";

const router = express.Router();

// Buy subscription
router.route("/subscribe").get(isAuthenticated, buySubscription);

// Payment Varification and save refernce in database
router.route("/paymentvarification").post(isAuthenticated, paymentVarification);

// Get Razorpay key
router.route("/razorpaykey").get(getRazorPayKey);

// Cancel Subscription
router.route("/subscribe/cancel").delete(isAuthenticated, cancelSubscription);

export default router;
