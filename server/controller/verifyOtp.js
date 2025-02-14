// import otpModel from '../models/otpModel'

export const verifyOtp = async (request, response) => {
  const { email, otp } = request.body
  try {
    // const user = await otpModel.findOne({ email });
    // if (user.otp === otp) return res.status(201).json({
    //   message: "Succesfull",
    //   success: false,
    //   error: true
    // });

    res.status(200).json({
      message: "Try again",
      success: false,
      error: true
    });

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}