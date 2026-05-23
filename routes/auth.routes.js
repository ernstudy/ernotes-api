import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("authentication route");
});

export default router;
