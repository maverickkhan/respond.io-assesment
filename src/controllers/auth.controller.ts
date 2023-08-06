import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';
import { omit } from 'lodash';

export class AuthController {
  public auth = Container.get(AuthService);

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.auth.signup(userData);
      omit(signUpUserData, ['password']);
      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const { token, findUser } = await this.auth.login(userData);
      res.status(200).json({ data: findUser, token, message: 'login' });
    } catch (error) {
      next(error);
    }
  };
}
