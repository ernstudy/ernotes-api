import express from "express";
import NotesController from "../controllers/notes.controller.js";
import NoteController from "../controllers/notes.controller.js";

const notesController = new NotesController();

const router = express.Router();

router.get("/", notesController.getAllUserNotes);

router.get("/:id", notesController.getUserNoteById);

router.post("/", notesController.createUserNote);

router.put("/:id", notesController.updateUserNote);

router.delete("/:id", (req, res) => {
  res.send(`deleting note with ID: ${req.params.id}`);
});

export default router;
