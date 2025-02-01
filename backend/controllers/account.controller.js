import mongoose from "mongoose";
import Account from "../models/account.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Ensure this is installed: npm install jsonwebtoken

// Environment secret key for JWT
const JWT_SECRET = "yourSecretKey"; // Replace this with a secure environment variable

// Create a new account
export const createAccount = async (req, res) => {
  const { username, email, password, role } = req.body;

  // Check for required fields
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all required fields" });
  }

  try {
    // Check for duplicate username or email
    const existingUser = await Account.findOne({ username });
    const existingEmail = await Account.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }
    if (existingEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the account
    const newAccount = new Account({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newAccount.save();

    res.status(201).json({ success: true, data: newAccount });
  } catch (error) {
    console.error("Error in creating account:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update account
export const updateAccount = async (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;

  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Account ID" });
  }

  try {
    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      { username, email, role },
      { new: true } // Return the updated document
    );

    if (!updatedAccount) {
      return res
        .status(404)
        .json({ success: false, message: "Account not found" });
    }

    res.status(200).json({ success: true, data: updatedAccount });
  } catch (error) {
    console.error("Error in updating account:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the account exists
    const account = await Account.findOne({ email });
    if (!account) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: account._id, email: account.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Respond with the token and user details
    res.status(200).json({
      success: true,
      token,
      user: { id: account._id, email: account.email, username: account.username },
    });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
