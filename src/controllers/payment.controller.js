import { instance } from "../index.js";
import crypto from "crypto";
import { asyncHandler } from "../utils/asyncHandler.js";
// import { Lender } from "../models/lender.model.js";
const checkout = asyncHandler(async (req, res) => {
  //to create order
  const { rent_amount } = req.body;
  const options = {
    amount: rent_amount * 100, //in rupees
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  console.log(order);
  res.status(200).json({
    success: true,
  });
});

const paymentVerification = asyncHandler(async (req, res) => {
  //to verify order
  const { order_id, payment_id, signature } = req.body;
  const body = order_id + "|" + payment_id;

  const expected_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");
  console.log("SIG received", signature);
  console.log("SIG received", expected_signature);
  const success = expected_signature == signature;
  if (success) {
    res.status(201).json({
      passed: true,
    });
  } else {
    res.status(400).json({
      passed: false,
    });
  }
});

const transferToUPI = asyncHandler(async (req, res) => {
  const lender = req.Lender;
  const amount = lender.rent_amount;
  const upiId = lender.upiId;
  const currency = "INR";

  try {
    const transfer = await instance.transfers.create({
      account: "your_account_id", // Your account ID from Razorpay
      amount: amount * 100, // Amount in paisa
      currency,
      mode: "upi",
      notes: {
        // Optional notes about the transfer
        from: "Pedals",
        to: "JIT",
      },
      recipient: {
        type: "upi",
        account: upiId,
      },
    });

    // Handle successful transfer
    res.status(200).json({
      success: true,
      transfer,
    });
  } catch (error) {
    // Handle transfer failure
    console.error("Transfer failed:", error);
    res.status(500).json({
      success: false,
      message: "Transfer failed. Please try again later.",
    });
  }
});

export { transferToUPI };

export { checkout, paymentVerification };
