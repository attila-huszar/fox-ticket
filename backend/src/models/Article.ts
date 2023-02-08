import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import ArticleUser from './ArticleUser';
import User from './User';

@Table({
  timestamps: true,
})
export default class Article extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  publish_date!: Date;

  @BelongsToMany(() => User, () => ArticleUser)
  admins: User[];
}
