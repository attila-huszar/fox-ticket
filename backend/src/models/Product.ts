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
    type: 'TIMESTAMP',
    defaultValue: Sequelize.fn('NOW'),
    allowNull: false,
  })
  createdAt: Date;

  @Column({
    type: 'TIMESTAMP',
    defaultValue: Sequelize.fn('NOW'),
    allowNull: false,
  })
  updatedAt: Date;

  @HasMany(() => Order)
  orders: Order[];
}
