import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("getting trash");
});

export default router;
