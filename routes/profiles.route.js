import express from "express";

import ProfileService from "../services/profiles.service.js";

import { getAllProfilesController } from "../controllers/profiles.controller.js";

const router = express.Router();

const service = new ProfileService();

router.get("/", getAllProfilesController);

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await service.findOne(userId);
  const data = {
    message: "User retrieved successfully",
    user: user,
  };
  res.json(data);
});

router.post("/", (req, res) => {
  try {
    const newUser = req.body;
    service.create(newUser);
    const data = {
      message: "User created successfully",
      user: newUser,
    };
    res.json(data);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
