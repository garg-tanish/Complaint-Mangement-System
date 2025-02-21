import express from "express";

import { signin, signup, verifySignin, verifySignup } from "../controller/user.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/verify-signin", verifySignin);
router.post("/verify-signup", verifySignup);

export default router;