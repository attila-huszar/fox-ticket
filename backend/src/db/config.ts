import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  database: "foxticket",
  dialect: "mysql",
  username: "root",
  password: "admin",
  storage: ":memory:",
  models: [__dirname + "/models"],
});

sequelize.addModels([__dirname + "/**/*.model.ts"]);
