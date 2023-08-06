import { Sequelize, DataTypes, Model, Optional, ForeignKey } from 'sequelize';
import { Note } from '@interfaces/notes.interface';
import { UserModel } from './users.model';

export type NoteCreationAttributes = Optional<Note, 'id' | 'title' | 'content' | 'userId'>;

export class NotesModel extends Model<Note, NoteCreationAttributes> implements Note {
  public id: number;
  public title: string;
  public content: string;
  declare userId: ForeignKey<UserModel['id']>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof NotesModel {
  NotesModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING(45),
        defaultValue: 'Unnamed Note',
      },
      content: {
        allowNull: false,
        type: new DataTypes.STRING(4096),
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'notes',
      sequelize,
    },
  );

  NotesModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'users',
  });

  return NotesModel;
}
