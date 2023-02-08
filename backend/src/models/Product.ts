import {
  Sequelize,
  Table,
  Model,
  Column,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import Order from './Order';

@Table({})
export default class Product extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  duration!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string;

  @Column({
    type: DataType.DATE,
    defaultValue:
      process.env.NODE_ENV === 'test'
        ? 'CURRENT_TIMESTAMP'
        : Sequelize.fn('NOW'),
    allowNull: false,
  })
  createdAt: string;

  @Column({
    type: DataType.DATE,
    defaultValue:
      process.env.NODE_ENV === 'test'
        ? 'CURRENT_TIMESTAMP'
        : Sequelize.fn('NOW'),
    allowNull: false,
  })
  updatedAt: string;

  @HasMany(() => Order)
  orders: Order[];
}
