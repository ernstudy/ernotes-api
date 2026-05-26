import express from "express";
import NotesController from "../controllers/notes.controller.js";

const notesController = new NotesController();

const router = express.Router();

router.get("/", notesController.getAllUserNotes);

router.get("/:id", notesController.getUserNoteById);

router.post("/", notesController.createUserNote);

router.put("/:id", notesController.updateUserNote);

router.delete("/:id", notesController.deleteUserNote);

router.patch("/:id/trash", notesController.moveNoteToTrash);

router.patch("/:id/untrash", notesController.removeNoteFromTrash);

export default router;
