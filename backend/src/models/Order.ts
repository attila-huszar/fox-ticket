import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsToMany,
  BelongsTo,
} from 'sequelize-typescript';
import OrderProduct from './OrderProduct';
import Product from './Product';
import User from './User';

@Table({
  timestamps: true,
})
export default class Order extends Model {
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  orderDate!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  amount!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  paidDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expirationDate!: Date;

  @BelongsToMany(() => Product, () => OrderProduct)
  products: Product[];

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
