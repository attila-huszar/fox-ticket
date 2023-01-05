import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import Order from './Order';
import Product from './Product';

@Table({
  timestamps: true,
})
export default class OrderProduct extends Model {
  @ForeignKey(() => Order)
  @Column
  orderId: number;

  @ForeignKey(() => Product)
  @Column
  productId: number;
}
