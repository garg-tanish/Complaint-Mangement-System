import dotenv from 'dotenv';
import nodemailer from 'nodemailer'

dotenv.config({ path: '../../.env' });

export const sendEmail = async (request, response) => {
  try {
    const { email, subject, content, reciever } = request.body

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
      to: `${reciever === 'admin' ? process.env.GMAIL_EMAIL : reciever === 'both' ? `${process.env.GMAIL_EMAIL},${email}` : email}`,
      subject: `${subject}`,
      text: `${content}`
    });

    return response.status(200).json({
      success: true,
      message: `Email sent successfully.`
    })

  } catch (error) {
    return response.status(500).json({
      error: true,
      message: error.message || error
    })
  }
}