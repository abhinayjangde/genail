import { Note } from '../models/note.model.js';
import { publishNoteCreated } from '../queue/publisher.js';

export const createNote = async (title: string, content: string, userEmail: string) => {
  const note = await Note.create({ title, content, userEmail });
  // Publish event AFTER successful DB save
  await publishNoteCreated({ noteId: note.id, title, userEmail });
  return note;
};

export const getNotes = async () => Note.find().sort({ createdAt: -1 });

export const deleteNote = async (id: string) => Note.findByIdAndDelete(id);