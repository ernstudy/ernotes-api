import express from "express";
import {
  createUserWithProfileController,
  deleteUserController,
  loginUserController,
  logoutUserWithProfileController,
} from "../controllers/auth.controller.js";
import authenticateToken from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", createUserWithProfileController);

router.post("/login", loginUserController);

router.delete("/delete", authenticateToken, deleteUserController);

router.post("/logout", authenticateToken, logoutUserWithProfileController);

export default router;
