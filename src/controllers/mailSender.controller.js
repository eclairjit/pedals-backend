import otpGenerator from "otp-generator";
import { OTP } from "../models/OTPgenerator.model.js";
import { User } from "../models/user.model.js";
import nodemailer from "nodemailer";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Cycle } from "../models/cycle.model.js";
const sendOTPLender = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    console.log(req.body);
    const checkUserPresent = await User.findOne({ email: email });
    console.log(checkUserPresent);
    if (!checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User Not found",
      });
    }
    // console.log(checkUserPresent._id);
    const lender = await User.findOne(checkUserPresent._id);

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    // console.log(otpBody);

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      // port:process.env.PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    let info = await transporter.sendMail({
      from: "www.pedals.com-Pedals",
      to: email,
      subject: "Verify your otp",
      html: `    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
      <tr>
          <td align="center" bgcolor="#f0f0f0" style="padding: 40px 0;">
              <h1 style="color: #333333;">OTP Verification</h1>
          </td>
      </tr>
      <tr>
          <td bgcolor="#ffffff" style="padding: 40px 30px;">
              <p style="font-size: 16px; color: #333333;">
                  Your OTP for verification is: <strong>${otp}</strong>
              </p>
              <p style="font-size: 16px; color: #333333;">
                  Please use this OTP to verify your account using this link {http://localhost:5400/api/v1/verify/Lender/${checkUserPresent._id}}.
              </p>
          </td>
      </tr>
      <tr>
          <td bgcolor="#f0f0f0" style="padding: 20px 30px;">
              <p style="font-size: 12px; color: #666666; text-align: center;">
                  This email was sent to you as part of the OTP verification process from team Pedals. If you did not request this OTP, please ignore this email.
              </p>
          </td>
      </tr>
  </table>`,
    });
    await transporter.sendMail(info);
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
});

const sendOTPReceiver = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    console.log(req.body);
    const checkUserPresent = await User.findOne({ email: email });
    console.log(checkUserPresent);
    if (!checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User Not found",
      });
    }
    // console.log(checkUserPresent._id);
    const lender = await User.findOne(checkUserPresent._id);

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    // console.log(otpBody);

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      // port:process.env.PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    let info = await transporter.sendMail({
      from: "www.pedals.com-Pedals",
      to: email,
      subject: "Verify your otp",
      html: `    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
      <tr>
          <td align="center" bgcolor="#f0f0f0" style="padding: 40px 0;">
              <h1 style="color: #333333;">OTP Verification</h1>
          </td>
      </tr>
      <tr>
          <td bgcolor="#ffffff" style="padding: 40px 30px;">
              <p style="font-size: 16px; color: #333333;">
                  Your OTP for verification is: <strong>${otp}</strong>
              </p>
              <p style="font-size: 16px; color: #333333;">
                  Please use this OTP to verify your account using this link {http://localhost:5400/api/v1/verify/receiver/${checkUserPresent._id}}.
              </p>
          </td>
      </tr>
      <tr>
          <td bgcolor="#f0f0f0" style="padding: 20px 30px;">
              <p style="font-size: 12px; color: #666666; text-align: center;">
                  This email was sent to you as part of the OTP verification process from team Pedals. If you did not request this OTP, please ignore this email.
              </p>
          </td>
      </tr>
  </table>`,
    });
    await transporter.sendMail(info);
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
});
const verifyOTPLender = asyncHandler(async (req, res) => {
  try {
    const user_id = req.params.id;
    const { otp } = req.body;
    console.log(req.params.id); //TBR
    const lender = await User.findOne({ _id: user_id });
    console.log(lender); //TBR
    const user = await OTP.findOne({ email: lender.email });
    if (!user) {
      res.status(401).json({
        success: "FALSE",
        message: "No receiver.",
      });
    }
    if (!otp || !user.otp || user.otp != otp) {
      res.status(400).json({ success: false, error: "INVALID OTP" });
    } else {
      res.status(200).json({ success: true, message: "USER VERIFIED" });
      const lenderCycle = await Cycle.findOne(user_id);
      lenderCycle.isActive = 0;
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
});

const verifyOTPReceiver = asyncHandler(async (req, res) => {
  try {
    const user_id = req.params.id;
    const { otp } = req.body;
    console.log(otp); //TBR
    const lender = await User.findOne({ _id: user_id });
    console.log(lender); //TBR
    const user = await OTP.findOne({ email: lender.email });

    if (!user) {
      res.status(401).json({
        success: "FALSE",
        message: "No receiver.",
      });
    }
    if (!otp || !user.otp || user.otp != otp) {
      res.status(400).json({ success: false, error: "INVALID OTP" });
    } else {
      res.status(200).json({ success: true, message: "USER VERIFIED" });
      const lenderCycle = await Cycle.findOne(user_id);
      lenderCycle.isActive = 1;
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
});

export { sendOTPLender, sendOTPReceiver, verifyOTPLender, verifyOTPReceiver };
