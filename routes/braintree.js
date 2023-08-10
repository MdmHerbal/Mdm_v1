import express from "express";
import brainTreeController from "../controller/braintree.js";
import razorpayController from "../controller/razorpay.js";
const router = express.Router();
router.post("/braintree/get-token", brainTreeController.ganerateToken);
// router.post("/braintree/payment", brainTreeController.paymentProcess);
router.post("/razorpay/payment", razorpayController.paymentProcess);

export default router;
