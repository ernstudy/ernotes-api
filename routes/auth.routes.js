import express from "express";
import {
  createUserWithProfileController,
  deleteUserController,
  loginUserController,
} from "../controllers/auth.controller.js";
import authenticateToken from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", createUserWithProfileController);

router.post("/login", loginUserController);

router.delete("/delete", authenticateToken, deleteUserController);

export default router;
