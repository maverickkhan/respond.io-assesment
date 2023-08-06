import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(9)
  @MaxLength(32)
  public password: string;
}
