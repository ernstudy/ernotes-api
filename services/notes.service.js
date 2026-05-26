import supabase from "../config/supabaseAdmin.config.js";

class NotesService {
  //
  async findAllNotes(userId) {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async findOneNote(noteId, userId) {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("id", noteId)
      .eq("user_id", userId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async createNote(note, userId) {
    const noteData = {
      ...note,
      user_id: userId,
    };

    const { data, error } = await supabase
      .from("notes")
      .insert(noteData)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async updateNote(noteId, note, userId) {
    const { data, error } = await supabase
      .from("notes")
      .update(note)
      .eq("id", noteId)
      .eq("user_id", userId);

    if (error) {
      throw new Error(error.message);
    }

    console.log("Updated note:", data);
    return data;
  }

  async deleteNote(noteId, userId) {
    const { data, error } = await supabase
      .from("notes")
      .delete()
      .eq("id", noteId)
      .eq("user_id", userId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async moveNoteToTrash(noteId, userId, toTrash) {
    const { data, error } = await supabase
      .from("notes")
      .update(toTrash)
      .eq("id", noteId)
      .eq("user_id", userId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async removeNoteFromTrash(noteId, userId, toUntrash) {
    const { data, error } = await supabase
      .from("notes")
      .update(toUntrash)
      .eq("id", noteId)
      .eq("user_id", userId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async addToFavorites(noteId, userId, toFavorite) {
    const { data, error } = await supabase
      .from("notes")
      .update(toFavorite)
      .eq("id", noteId)
      .eq("user_id", userId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async removeFromFavorites(noteId, userId, toUnfavorite) {
    const { data, error } = await supabase
      .from("notes")
      .update(toUnfavorite)
      .eq("id", noteId)
      .eq("user_id", userId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}

export default NotesService;
