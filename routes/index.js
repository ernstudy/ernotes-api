import express from "express";
import profilesRoutes from "./profiles.route.js";
import notesRoutes from "./notes.route.js";
import authRoutes from "./auth.routes.js";
import authenticateToken from "../middlewares/auth.middleware.js";

const apiRouter = (app) => {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/profiles", profilesRoutes);
  router.use("/notes", authenticateToken, notesRoutes);
  router.use("/auth", authRoutes);
};

export default apiRouter;
