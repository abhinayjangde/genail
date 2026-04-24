import {Redis} from 'ioredis';

const redis = new Redis({ host: 'localhost', port: 6379 });

export const publishNoteCreated = async (payload: {
  noteId: string;
  title: string;
  userEmail: string;
}) => {
  await redis.xadd(
    'note.created',   // stream name
    '*',              // auto-generate message ID
    'noteId',    payload.noteId,
    'title',     payload.title,
    'userEmail', payload.userEmail
  );
  console.log('Event published: note.created', payload.noteId);
};