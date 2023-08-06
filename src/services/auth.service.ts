import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { SECRET_KEY } from '@config';
import { DB } from '@database';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@/exceptions/httpException';
import { DataStoredInToken } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';

const createToken = (user: User): string => {
  const dataStoredInToken: DataStoredInToken = { id: user.id };
  const expiresIn: number = 60 * 60;
  const token = sign(dataStoredInToken, SECRET_KEY, { expiresIn });
  return token;
};

@Service()
export class AuthService {
  public async signup(userData: CreateUserDto): Promise<User> {
    const findUser: User = await DB.Users.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await DB.Users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async login(userData: CreateUserDto): Promise<{ token: string; findUser: User }> {
    const findUser: User = await DB.Users.findOne({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password not matching');

    const token = createToken(findUser);

    return { token, findUser };
  }
}
