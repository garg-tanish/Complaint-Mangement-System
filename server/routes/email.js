import express from "express";
import { sendOtp } from '../controller/sendOtp.js';
import { sendEmail } from '../controller/sendEmail.js';

const router = express.Router();

router.post('/sendOtp', sendOtp)
router.post('/sendEmail', sendEmail)

export default router;