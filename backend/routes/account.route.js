import express from "express";
import {
  createAccount,
  updateAccount,
  login, // Import the login controller
} from "../controllers/account.controller.js";

const router = express.Router();

// CRUD routes
router.post("/", createAccount); 
router.put("/:id", updateAccount); 

// Login route
router.post("/login", login); // Add the login endpoint

export default router;
