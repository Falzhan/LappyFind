import express from "express";
import {
  getLaptops,
  createLaptop,
  updateLaptop,
  deleteLaptop,
  upvoteLaptop,
  downvoteLaptop,
} from "../controllers/laptop.controller.js";

const router = express.Router();

router.get("/", getLaptops);
router.post("/", createLaptop);
router.put("/:id", updateLaptop);
router.delete("/:id", deleteLaptop);

router.post("/:id/upvote", upvoteLaptop);
router.post("/:id/downvote", downvoteLaptop);

export default router;
