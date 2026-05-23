import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("Getting users");
  res.send("Hello, Users!");
});

router.get("/:id", (req, res) => {
  console.log("Getting user with ID:", req.params.id);
  res.send(`Getting user with ID: ${req.params.id}`);
});

export default router;
