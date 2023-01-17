import dotenv from "dotenv";
import { app } from "./app";

dotenv.config({ path: __dirname + "./../../.env.local" });

app.listen(process.env.SERVER_PORT || 5000, () => {
  console.log(`Server active on http://${process.env.HOST}:${process.env.SERVER_PORT || 5000}`);
});
