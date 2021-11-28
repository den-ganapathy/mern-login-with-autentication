import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signin = async (req, res) => {
  const { loginEmail, loginPassword } = req.body;

  try {
    const existingUser = await User.find({ email: loginEmail });
    if (!existingUser.length)
      return res.status(400).json({ message: "user does not exist" });

    const isPasswordCorrect = await bcrypt.compare(
      loginPassword,
      existingUser[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).send({ message: "Wrong password entered" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "denganapathy",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmpassword, username } = req.body;
  try {
    const existingUser = await User.find({ email });
    if (existingUser.length)
      return res.status(400).json({ message: "user already exists" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password length should be 6 characters or more" });
    if (password !== confirmpassword)
      return res.status(400).json({ message: "password mismatch" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      "denganapathy",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
