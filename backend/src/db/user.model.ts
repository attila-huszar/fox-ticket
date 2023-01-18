import { Table, Column, Model } from "sequelize-typescript";

@Table
export default class User extends Model {
  @Column
  name: string | undefined;
  @Column
  email: string | undefined;
  @Column
  passHash: string | undefined;
  @Column
  pic: Buffer | undefined;
  @Column
  role: string | undefined;
}
