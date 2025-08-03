// controllers/authController.js
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async (req, res) => {
  const {
    username,
    email,
    password,
    name,
    bio,
    linkedInUrl,
    skills,
    walletAddress,
  } = req.body;

  if (!walletAddress || walletAddress.trim() === '') {
    return res.status(400).json({ error: 'walletAddress is required' });
  }

  try {
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "Username or email already in use" });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      name,
      bio,
      linkedInUrl,
      skills: skills || [],
      walletAddress,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || !user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {id: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
