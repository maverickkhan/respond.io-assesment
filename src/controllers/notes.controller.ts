import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CreateNotesDto, UpdateNotesDto } from '@dtos/notes.dto';
import { Note } from '@interfaces/notes.interface';
import { NoteService } from '@services/notes.service';
import { User } from '@/interfaces/users.interface';

export class NoteController {
  public note = Container.get(NoteService);

  public getNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: User = req['user'];
      const findAllNotesData: Note[] = await this.note.findAllNotes(user);
      res.status(200).json({ data: findAllNotesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getNoteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const noteId = Number(req.params.id);
      const user: User = req['user'];
      const findOneNoteData: Note = await this.note.findNoteById(noteId, user);

      res.status(200).json({ data: findOneNoteData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const noteData: CreateNotesDto = req.body;
      const user: User = req['user'];
      const createNoteData: Note = await this.note.createNote(noteData, user);

      res.status(201).json({ data: createNoteData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const noteId = Number(req.params.id);
      const noteData: UpdateNotesDto = req.body;
      const user: User = req['user'];
      const updateNoteData: Note = await this.note.updateNote(noteId, noteData, user);

      res.status(200).json({ data: updateNoteData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const noteId = Number(req.params.id);
      const user: User = req['user'];
      const deleteNoteData: Note = await this.note.deleteNote(noteId, user);

      res.status(200).json({ data: deleteNoteData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
