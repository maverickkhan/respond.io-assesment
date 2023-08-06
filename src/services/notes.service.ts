import { Service } from 'typedi';
import { DB } from '@database';
import { CreateNotesDto, UpdateNotesDto } from '@dtos/notes.dto';
import { HttpException } from '@/exceptions/httpException';
import { Note } from '@interfaces/notes.interface';
import { redisClient } from '@/config/redis-client';
import { User } from '@/interfaces/users.interface';

@Service()
export class NoteService {
  public async findAllNotes(user: User): Promise<Note[]> {
    const key = `notes-${user.id}`;
    const cached = await redisClient.get(key);
    if (cached) {
      return JSON.parse(cached);
    }
    const allNotes: Note[] = await DB.Notes.findAll({
      where: {
        userId: user.id,
      },
      include: { model: DB.Users, as: 'users' },
    });
    await redisClient.setEx(key, 60 * 5, JSON.stringify(allNotes));
    return allNotes;
  }

  public async findNoteById(noteId: number, user: User): Promise<Note> {
    const key = `notes-${noteId}-${user.id}}`;
    const cached = await redisClient.get(key);
    if (cached) {
      return JSON.parse(cached);
    }
    const findNote: Note = await DB.Notes.findOne({ where: { id: noteId, userId: user.id } });
    redisClient.setEx(key, 60 * 5, JSON.stringify(findNote));
    if (!findNote) throw new HttpException(409, "note doesn't exist");
    return findNote;
  }

  public async createNote(noteData: CreateNotesDto, user: User): Promise<Note> {
    const createNoteData: Note = await DB.Notes.create({ ...noteData, userId: user.id });
    await redisClient.flushAll();
    return createNoteData;
  }

  public async updateNote(noteId: number, noteData: UpdateNotesDto, user: User): Promise<Note> {
    const findNote: Note = await DB.Notes.findByPk(noteId);
    if (!findNote) throw new HttpException(409, "Note doesn't exist");

    await DB.Notes.update({ ...noteData }, { where: { id: noteId, userId: user.id } });
    await redisClient.flushAll();
    const updateNote: Note = await DB.Notes.findByPk(noteId);
    return updateNote;
  }

  public async deleteNote(noteId: number, user: User): Promise<Note> {
    const findNote: Note = await DB.Notes.findByPk(noteId);
    if (!findNote) throw new HttpException(409, "Note doesn't exist");
    await DB.Notes.destroy({ where: { id: noteId, userId: user.id } });
    await redisClient.flushAll();
    return findNote;
  }
}
