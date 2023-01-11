import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: "../../.env" });

function generateServerSecret(): string {
  let secret: string = "";
  const secretBase: string = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < 64; i++) {
    secret += secretBase[Math.floor(Math.random() * 62)];
  }
  return secret;
}

export function resetServerSecret(): void {
  let env: string = "";
  let access: string = generateServerSecret();
  let refresh: string = generateServerSecret();

  try {
    fs.renameSync(path.join(__dirname, "..", "..", ".env"), path.join(__dirname, "..", "..", ".env.old"));

    env = fs.readFileSync(path.join(__dirname, "..", "..", ".env.old"), "utf-8");

    let envTemp = env.replace(/(?<=ACCESS_TOKEN=).*/, access);
    let envNew = envTemp.replace(/(?<=REFRESH_TOKEN=).*/, refresh);

    fs.writeFileSync(path.join(__dirname, "..", "..", ".env"), envNew);
  } catch (error: any) {
    console.error(`ERROR: ${error.message}`);
    return;
  }
}
resetServerSecret();
