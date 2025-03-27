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
    const User = await otpModel.findOne({ email, otp, is_used: 'false' });

    if (User) {
      const oldUser = await UserModal.findOne({ email });
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id, department: oldUser.department }, secret, { expiresIn: "1h" });
      await otpModel.updateOne({ email, otp }, { is_used: 'true' })

      return res.status(200).json({
        token,
        success: true,
        result: oldUser,
        message: "Sign In successfully"
      });
    }
    res.status(200).json({
      success: false,
      message: "Invalid otp"
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: `Something went wrong ${err} `
    });
  }
};

export const verifySignin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    const isPasswordCorrect = oldUser ? await bcrypt.compare(password, oldUser.password) : false;

    if (!oldUser || !isPasswordCorrect) return res.status(200).json({
      success: false,
      message: "Invalid credentials"
    });

    const otp = crypto.randomInt(1000, 9999);

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
      subject: "Otp for Complaint System",
      text: `Your otp is ${otp}. Kindly fill this to continue.`
    });

    const payload = { email, otp, is_used: "false" }
    const otpCol = new otpModel(payload)

    try {
      await otpCol.save()
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

    return res.status(200).json({
      success: true,
      message: `Otp Sent to ${email}`
    })
  } catch (err) {
    res.status(500).json({
      error: true,
      message: `Something went wrong ${err} `
    });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, isAdmin, otp, department, batch, profile_pic } = req.body;
  try {
    const User = await otpModel.findOne({ email, otp, is_used: 'false' });
    if (User) {
      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await UserModal.create({ email, password: hashedPassword, isAdmin, department, batch, profile_pic, name: `${firstName} ${lastName}` });
      const token = jwt.sign({ email: result.email, id: result._id, department: result.department }, secret, { expiresIn: "1h" });
      await otpModel.updateOne({ email, otp }, { is_used: 'true' })

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
        subject: "Registration succesful",
        text: `You are succesfully registerd to complaint system.
        Here's your details:
        👤 User Name: ${firstName} ${lastName}
        📧 Email: ${email}
        🏢 Department: ${department}
        🎓 Batch: ${batch}
      `
      });

      return res.status(201).json({
        token,
        result,
        success: true,
        message: "Sign Up successfully"
      });
    }
    res.status(200).json({
      success: false,
      message: "Invalid Otp"
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Something went wrong ${error} `
    });
  }
};

export const verifySignup = async (req, res) => {
  const { email } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(200).json({
      success: false,
      message: "User already exists"
    });
    const otp = crypto.randomInt(1000, 9999);

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
      subject: "Otp for Complaint System",
      text: `Your otp is ${otp}. Kindly fill this to continue further.`
    });

    const payload = { email, otp, is_used: "false" }
    const otpCol = new otpModel(payload)

    try {
      await otpCol.save()
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

    return res.status(200).json({
      success: true,
      message: `Otp Sent to ${email}`
    })
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Something went wrong ${error} `
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(200).json({
      success: false,
      message: "User doesn't exists"
    });
    const otp = crypto.randomInt(1000, 9999);

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
      subject: "Otp for Complaint System",
      text: `Your otp is to change password is ${otp}. Kindly fill this to continue further.`
    });

    const payload = { email, otp, is_used: "false" }
    const otpCol = new otpModel(payload)

    try {
      await otpCol.save()
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

    return res.status(200).json({
      success: true,
      message: `Otp Sent to ${email}`
    })
  } catch (error) {
    res.status(500).json({
      error: true,
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
        message: "Password Changed successfully"
      });
    }
    res.status(200).json({
      success: false,
      message: "Invalid credentials."
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Something went wrong ${error} `
    });
  }
};