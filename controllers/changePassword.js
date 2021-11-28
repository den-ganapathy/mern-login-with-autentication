import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const checkEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.find({ email });
    if (!existingUser.length)
      return res.status(404).json({ message: "user does not exist" });

    return res.status(200).json({ message: "user exist" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const changePassword = async (req, res) => {
  const { email, password, confirmpassword } = req.body;

  try {
    if (password !== confirmpassword) {
      return res.status(400).send({ message: "password doesnot match" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.findOneAndUpdate(
      { email: email },
      { password: hashedPassword },
      {
        new: true,
      }
    );
    res.status(200).json({ result: result, message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
