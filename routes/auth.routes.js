import express from "express";
import {
  createUserWithProfileController,
  loginUserController,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", createUserWithProfileController);

router.post("/login", loginUserController);

export default router;
