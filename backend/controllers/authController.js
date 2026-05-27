import User from "../models/User.js";
import Otp from "../models/Otp.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import otpGenerator from "otp-generator";

import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

// SIGNUP

export const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // GENERATE OTP

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,

      lowerCaseAlphabets: false,

      specialChars: false,
    });

    // SAVE OTP

    await Otp.create({
      email,

      otp,

      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    // SEND EMAIL

    await sendEmail(
      email,

      "OTP Verification",

      `Your OTP is ${otp}`,
    );

    res.status(201).json({
      success: true,

      message: "Signup Successfully. OTP Sent",

      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// VERIFY OTP

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await Otp.findOne({
      email,
      otp,
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,

        message: "Invalid OTP",
      });
    }

    // CHECK EXPIRY

    if (otpRecord.expiresAt < Date.now()) {
      return res.status(400).json({
        success: false,

        message: "OTP Expired",
      });
    }

    // VERIFY USER

    await User.findOneAndUpdate(
      { email },

      { isVerified: true },
    );

    // DELETE OTP

    await Otp.deleteOne({
      _id: otpRecord._id,
    });

    res.status(200).json({
      success: true,

      message: "OTP Verified Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// RESEND OTP

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,

      lowerCaseAlphabets: false,

      specialChars: false,
    });

    await Otp.deleteMany({ email });

    await Otp.create({
      email,

      otp,

      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    await sendEmail(
      email,

      "Resend OTP",

      `Your New OTP is ${otp}`,
    );

    res.status(200).json({
      success: true,

      message: "OTP Resent Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// LOGIN

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,

        message: "User Not Found",
      });
    }

    // CHECK VERIFIED

    if (!user.isVerified) {
      return res.status(400).json({
        success: false,

        message: "Please Verify OTP First",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,

        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id },

      process.env.JWT_SECRET,

      { expiresIn: "7d" },
    );

    await sendEmail(
      email,

      "Login Alert",

      "You have successfully logged in",
    );

    res.status(200).json({
      success: true,

      message: "Login Successfully",

      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// PROFILE

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json({
      success: true,

      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// LOGOUT

export const logoutUser = async (req, res) => {
  try {
    res.status(200).json({
      success: true,

      message: "Logout Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // CHECK USER

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,

        message: "User Not Found",
      });
    }

    // GENERATE RESET TOKEN

    const resetToken = crypto.randomBytes(20).toString("hex");

    console.log(resetToken);

    // SAVE TOKEN IN DB

    user.resetPasswordToken = resetToken;

    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    // RESET URL

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    // SEND EMAIL

    await sendEmail(
      user.email,

      "Password Reset",

      `Reset Your Password Using This Link: ${resetUrl}`,
    );

    res.status(200).json({
      success: true,

      message: "Password Reset Email Sent",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;

    const { password } = req.body;

    // FIND USER

    const user = await User.findOne({
      resetPasswordToken: token,

      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    // USER NOT FOUND

    if (!user) {
      return res.status(400).json({
        success: false,

        message: "Invalid Or Expired Token",
      });
    }

    // HASH NEW PASSWORD

    const hashedPassword = await bcrypt.hash(password, 10);

    // UPDATE PASSWORD

    user.password = hashedPassword;

    // REMOVE RESET FIELDS

    user.resetPasswordToken = undefined;

    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,

      message: "Password Reset Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
