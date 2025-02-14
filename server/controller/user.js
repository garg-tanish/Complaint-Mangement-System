import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModal from "../models/user.js";

const secret = 'test';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({
      message: "User doesn't exist",
      success: false,
      error: true
    });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({
      message: "Invalid credentials",
      success: false,
      error: true
    });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({
      message: "Sign In successfully",
      success: true,
      error: false,
      result: oldUser,
      token
    });
  } catch (err) {
    res.status(500).json({
      message: `Something went wrong ${err} `,
      success: false,
      error: true
    });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, isAdmin } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({
      message: "User already exists",
      success: false,
      error: true
    });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await UserModal.create({ email, password: hashedPassword, isAdmin, name: `${firstName} ${lastName}` });
    const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

    res.status(201).json({
      result, token,
      message: "Sign Up successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong ${err} `,
      success: false,
      error: true
    });
    console.log(error);
  }
};
