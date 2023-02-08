import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import Order from './Order';

@Table({
  timestamps: true,
})
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

  @HasMany(() => Order)
  orders: Order[];
}
