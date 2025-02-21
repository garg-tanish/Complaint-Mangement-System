import crypto from 'crypto'
import dotenv from 'dotenv';
import nodemailer from 'nodemailer'
import otpModel from '../models/otpModel.js'

dotenv.config({ path: '../../.env' });

export const sendOtp = async (request, response) => {

  try {
    const { email } = request.body

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

    return response.status(201).json({
      message: `Otp Sent to ${email}`,
      error: false,
      success: true
    })

  } catch (error) {
    return response.status(500).json({
      message: error.message || error
    })
  }

}