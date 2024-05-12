import express from "express";
import {
  checkout,
  paymentVerification,
  transferToUPI,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.route("/checkout").post(checkout);

router.route("/paymentverification").post(paymentVerification);
router.route("/transferSuccess").post(transferToUPI);

export default router;
