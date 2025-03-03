import crypto from 'crypto'
import dotenv from 'dotenv';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer'
import UserModal from "../models/user.js";
import otpModel from '../models/otpModel.js'

const secret = 'test';
dotenv.config({ path: '../../.env' });

export const signin = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const User = await otpModel.find({ email, otp, is_used: 'false' });

    if (User) {
      const oldUser = await UserModal.findOne({ email });
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id, department: oldUser.department }, secret, { expiresIn: "1h" });
      await otpModel.updateOne({ email, otp }, { is_used: 'true' })
      return res.status(200).json({
        message: "Sign In successfully",
        success: true,
        error: false,
        result: oldUser,
        token
      });
    }
    res.status(200).json({
      message: "Sign In unsuccessful",
      success: false,
      error: true
    });
  } catch (err) {
    res.status(500).json({
      message: `Something went wrong ${err} `
    });
  }
};

export const verifySignin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(200).json({
      message: "User doesn't exist",
      success: false,
      error: true
    });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(200).json({
      message: "Invalid credentials",
      success: false,
      error: true
    });

    const otp = crypto.randomInt(1000, 9999);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // false for other ports like 587
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_EMAIL,
      to: `${email}`,
      subject: "Otp for Complaint System",
      text: `Your otp is ${otp}. Kindly fill this to continue.`
    });

    const payload = { email, otp, is_used: "false" }
    const otpCol = new otpModel(payload)

    try {
      await otpCol.save()
    } catch (error) {
      res.status(409).json({ message: error.message });
    }

    return res.status(201).json({
      message: `Otp Sent to ${email}`,
      error: false,
      success: true
    })
  } catch (err) {
    res.status(500).json({
      message: `Something went wrong ${err} `
    });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, isAdmin, otp, department, batch } = req.body;

  try {
    const User = await otpModel.find({ email, otp, is_used: 'false' });

    if (User) {
      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await UserModal.create({ email, password: hashedPassword, isAdmin, department, batch, name: `${firstName} ${lastName}` });
      const token = jwt.sign({ email: result.email, id: result._id, department: result.department }, secret, { expiresIn: "1h" });
      await otpModel.updateOne({ email, otp }, { is_used: 'true' })
      return res.status(200).json({
        message: "Sign Up successfully",
        success: true,
        error: false,
        result,
        token
      });
    }
    res.status(200).json({
      message: "Sign Up unsuccessful",
      success: false,
      error: true
    });
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong ${error} `
    });
  }
};

export const verifySignup = async (req, res) => {
  const { email } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({
      message: "User already exists",
      success: false,
      error: true
    });
    const otp = crypto.randomInt(1000, 9999);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // false for other ports like 587
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_EMAIL,
      to: `${email}`,
      subject: "Otp for Complaint System",
      text: `Your otp is ${otp}. Kindly fill this to continue further.`
    });

    const payload = { email, otp, is_used: "false" }
    const otpCol = new otpModel(payload)

    try {
      await otpCol.save()
    } catch (error) {
      res.status(409).json({ message: error.message });
    }

    return res.status(201).json({
      message: `Otp Sent to ${email}`,
      error: false,
      success: true
    })
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong ${error} `
    });
  }
};

export const changePassword = async (req, res) => {
  const { email, password, newPassword } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (isPasswordCorrect) {
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await UserModal.updateOne({ email }, { password: hashedPassword });
      return res.status(200).json({
        message: "Password Changed successfully",
        success: true,
        error: false
      });
    }
    res.status(200).json({
      message: "Enter valid password.",
      success: false,
      error: true
    });
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong ${error} `
    });
  }
};