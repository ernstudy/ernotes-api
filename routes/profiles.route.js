import express from "express";

import ProfileService from "../services/profiles.service.js";

import {
  getAllProfilesController,
  UpdateProfileController,
} from "../controllers/profiles.controller.js";
import authenticateToken from "../middlewares/auth.middleware.js";

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

router.put("/", authenticateToken, UpdateProfileController);

export default router;
