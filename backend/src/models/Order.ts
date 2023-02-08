import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Default
} from 'sequelize-typescript';
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

  @Default('pending')
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;

  @Column({
    type: DataType.DATE,
  })
  paidDate: Date;

  @Column({
    type: DataType.DATE,
  })
  expirationDate: Date;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Product)
  @Column
  productId: number;

  @BelongsTo(() => Product)
  product: Product;
}
