import express from "express";

import { createLaptop, deleteLaptop, getLaptops, updateLaptop } from "../controllers/laptop.controller.js";

const router = express.Router();

router.get("/", getLaptops);

router.post("/", createLaptop);

router.put("/:id", updateLaptop);

router.delete("/:id",  deleteLaptop);



export default router;