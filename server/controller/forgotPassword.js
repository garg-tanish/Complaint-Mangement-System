import dotenv from 'dotenv';
import bcrypt from "bcryptjs"
import nodemailer from 'nodemailer'
import UserModal from "../models/user.js";
import otpModel from '../models/otpModel.js'

dotenv.config({ path: '../../.env' });

export const ForgotPassword = async (req, res) => {
  const { email, password, otp } = req.body;

  try {
    const isOtp = await otpModel.findOne({ email, otp, is_used: 'false' });

    if (isOtp) {
      const hashedPassword = await bcrypt.hash(password, 12);
      await otpModel.updateOne({ email, otp }, { is_used: 'true' })
      await UserModal.updateOne({ email }, { password: hashedPassword })

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.GMAIL_EMAIL,
          pass: process.env.GMAIL_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: process.env.GMAIL_EMAIL,
        to: `${email}`,
        subject: "Password Changed",
        text: `Your password is change for compliant system.`
      });

      return res.status(200).json({
        success: true,
        message: "Password changed successfully"
      });
    }
    res.status(200).json({
      success: false,
      message: "Invalid Otp."
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Something went wrong ${error} `
    });
  }
};