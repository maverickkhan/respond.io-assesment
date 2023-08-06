import { IsString, IsNotEmpty, MinLength, MaxLength, IsNumber, IsOptional } from 'class-validator';

export class CreateNotesDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public title: string;

  @IsString()
  @IsNotEmpty()
  public content: string;

  @IsNumber()
  public userId: number;
}

export class UpdateNotesDto {
  @IsString()
  @IsOptional()
  @MinLength(9)
  @MaxLength(32)
  public title: string;

  @IsString()
  @IsOptional()
  public content: string;
}
