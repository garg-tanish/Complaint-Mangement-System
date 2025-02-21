import otpModel from '../models/otpModel.js'

export const verifyOtp = async (request, response) => {

  const { email, otp } = request.body

  try {
    const user = await otpModel.findOne({ email });
    if (user.otp === otp) return res.status(200).json({
      message: "Otp validation completed.",
      success: true,
      error: false
    });

    res.status(200).json({
      message: "Invalid Otp",
      success: false,
      error: true
    });

  } catch (error) {
    return response.status(500).json({
      message: error.message || error
    })
  }
}