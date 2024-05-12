import { Router } from "express";
import app from "../app.js";
import {
  sendOTPReceiver,
  sendOTPLender,
  verifyOTPLender,
  verifyOTPReceiver,
} from "../controllers/mailSender.controller.js";
const router = Router();
router.route("/LenderEmail").post(sendOTPLender);
router.route("/receiverEmail").post(sendOTPReceiver);
router.route("/Lender/:id").post(verifyOTPLender);
router.route("/receiver/:id").post(verifyOTPReceiver);
export default router;
