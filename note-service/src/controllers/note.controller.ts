import type { Request, Response } from 'express';
import * as noteService from '../services/note.service.js';

export const create = async (req: Request, res: Response) => {
  const { title, content, userEmail } = req.body;
  if (!title || !content || !userEmail)
    return res.status(400).json({ error: 'title, content, userEmail required' });

  const note = await noteService.createNote(title, content, userEmail);
  res.status(201).json(note);
};

export const getAll = async (_req: Request, res: Response) => {
  const notes = await noteService.getNotes();
  res.json(notes);
};

export const remove = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  if (!id) return res.status(400).json({ error: 'id required' });

  await noteService.deleteNote(id);
  res.json({ message: 'Note deleted' });
};