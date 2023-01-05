import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import Article from './Article';
import User from './User';

@Table({
  timestamps: true,
})
export default class ArticleUser extends Model {
  @ForeignKey(() => Article)
  @Column
  articleId: number;

  @ForeignKey(() => User)
  @Column
  adminId: number;
}
