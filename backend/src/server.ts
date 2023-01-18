import dotenv from "dotenv";
import { app } from "./app";
import db from "./db/db";

dotenv.config({ path: __dirname + "./../../.env.local" });

const host = process.env.HOST || "127.0.0.1";
const port = process.env.SERVER_PORT || 5000;

app.listen(port, async () => {
  console.log(`Server listening on http://${host}:${port}`);

  //await db.sync({ alter: true });
});
