import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("getting notes");
});

router.get("/:id", (req, res) => {
  res.send(`getting note with ID: ${req.params.id}`);
});

router.post("/", (req, res) => {
  res.send("creating a new note");
});

router.put("/:id", (req, res) => {
  res.send(`updating note with ID: ${req.params.id}`);
});

router.delete("/:id", (req, res) => {
  res.send(`deleting note with ID: ${req.params.id}`);
});

export default router;
