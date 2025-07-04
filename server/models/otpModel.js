import mongoose from 'mongoose';

const otpSchema = mongoose.Schema({

  email: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  is_used: {
    type: Boolean
  }
}, {
  timestamps: true
})

export default mongoose.model("Otp", otpSchema);