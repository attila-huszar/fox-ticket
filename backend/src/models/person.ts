import { Table, Column, Model } from 'sequelize-typescript';

@Table
export default class Person extends Model {
  @Column
  name: string;
}
