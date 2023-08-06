import { Router } from 'express';
import { NoteController } from '@controllers/notes.controller';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { CreateNotesDto, UpdateNotesDto } from '@/dtos/notes.dto';

export class NoteRoute implements Routes {
  public path = '/notes';
  public router = Router();
  public note = new NoteController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.note.getNotes);
    this.router.get(`${this.path}/:id(\\d+)`, this.note.getNoteById);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateNotesDto, true), this.note.createNote);
    this.router.put(`${this.path}/:id(\\d+)`, AuthMiddleware, ValidationMiddleware(UpdateNotesDto, true), this.note.updateNote);
    this.router.delete(`${this.path}/:id(\\d+)`, AuthMiddleware, this.note.deleteNote);
  }
}
