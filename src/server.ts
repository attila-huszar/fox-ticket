import dotenv from "dotenv";
import { app } from "./app";

dotenv.config({ path: "../.env" });

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server active on http://localhost:${process.env.PORT || 5000}`);
});
