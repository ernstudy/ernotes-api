import NotesService from "../services/notes.service.js";

const notesService = new NotesService();

class NoteController {
  async getAllUserNotes(req, res) {
    const userId = req.user.id; // Assuming user ID is available in req.user
    const notes = await notesService.findAllNotes(userId);

    const allUserNotes = {
      message: "Notes retrieved successfully",
      notes,
    };

    res.json(allUserNotes);
  }

  async createUserNote(req, res) {
    try {
      const userId = req.user.id;
      const noteData = req.body;

      const newNote = await notesService.createNote(noteData, userId);
      res.status(201).json(newNote);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserNoteById(req, res) {
    const userId = req.user.id;
    const noteId = req.params.id;

    try {
      const note = await notesService.findOneNote(noteId, userId);

      const createdNote = {
        message: "Note retrieved successfully",
        note,
      };
      res.json(createdNote);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateUserNote(req, res) {
    const userId = req.user.id;
    const noteId = req.params.id;
    const { title, content, category } = req.body;

    const note = {
      title,
      content,
      category,
      updated_at: new Date().toISOString(),
    };

    try {
      const updatedNote = await notesService.updateNote(noteId, note, userId);
      const data = {
        message: "Note updated successfully",
        updatedNote,
      };
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteUserNote(req, res) {
    const userId = req.user.id;
    const noteId = req.params.id;

    try {
      const deletedNote = await notesService.deleteNote(noteId, userId);
      const data = { message: "Note deleted successfully", deletedNote };
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async moveNoteToTrash(req, res) {
    const userId = req.user.id;
    const noteId = req.params.id;
    const toTrash = { is_archived: true, deleted_at: new Date().toISOString() };

    try {
      const trashedNote = await notesService.moveNoteToTrash(
        noteId,
        userId,
        toTrash,
      );
      const data = { message: "Note moved to trash successfully", trashedNote };
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default NoteController;
