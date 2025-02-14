import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true
  },
  otp: {
    type: String
  },
  is_used: {
    type: Boolean
  }
}, {
  timestamps: true
})

const otpModel = mongoose.model('Otp', otpSchema)

export default otpModel