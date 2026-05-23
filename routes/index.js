import express from "express";
import usersRoutes from "./users.routes.js";
import notesRoutes from "./notes.routes.js";
import authRoutes from "./auth.routes.js";
import categoriesRoutes from "./categories.routes.js";
import trashRoutes from "./trash.routes.js";
import favoritesRoutes from "./favorites.routes.js";

const apiRouter = (app) => {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/users", usersRoutes);
  router.use("/notes", notesRoutes);
  router.use("/auth", authRoutes);
  router.use("/categories", categoriesRoutes);
  router.use("/trash", trashRoutes);
  router.use("/favorites", favoritesRoutes);
};

export default apiRouter;
