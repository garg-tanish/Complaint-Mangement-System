import express from "express";

import { changePassword, signin, signup, verifyEmail, verifySignin, verifySignup } from "../controller/user.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/verify-signin", verifySignin);
router.post("/verify-signup", verifySignup);
router.post('/change-password', changePassword);

export default router;