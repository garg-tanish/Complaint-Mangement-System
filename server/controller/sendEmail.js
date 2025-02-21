import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

export const sendEmail = async (request, response) => {
  try {
    const { email, subject, content } = request.body

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
      subject: `${subject}`,
      text: `${content}`
    });

    return response.status(201).json({
      message: `Response sent successfully.`,
      error: false,
      success: true
    })

  } catch (error) {
    return response.status(500).json({
      message: error.message || error
    })
  }
}