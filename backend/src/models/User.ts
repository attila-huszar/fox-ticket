import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import Article from './Article';
import ArticleUser from './ArticleUser';
import Order from './Order';

@Table({
  timestamps: true,
})
export default class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isAdmin: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isVerified: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  token: string;

  @BelongsToMany(() => Article, () => ArticleUser)
  articles: Article[];

  @HasMany(() => Order)
  orders: Order[];
}
