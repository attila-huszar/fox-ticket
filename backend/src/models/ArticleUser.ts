import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import Article from './Article';
import User from './User';

@Table({
  timestamps: true,
})
export default class ArticleUser extends Model {
  @ForeignKey(() => Article)
  articleId: number;

  @ForeignKey(() => User)
  adminId: number;
}
