import mongoose, { Schema, Document } from 'mongoose';

export interface INote extends Document {
  title: string;
  content: string;
  userEmail: string;
  createdAt: Date;
}

const NoteSchema = new Schema<INote>({
  title:     { type: String, required: true },
  content:   { type: String, required: true },
  userEmail: { type: String, required: true },
}, { timestamps: true });

export const Note = mongoose.model<INote>('Note', NoteSchema);