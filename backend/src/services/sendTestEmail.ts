import { sendVerificationEmail } from "./sendVerificationEmail";
import readline from "readline";
import { mockUsers } from "./mockUsers";

export const testUser = mockUsers[2];

export let testKey: Promise<string>;

export function askTestEmail(question: string) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(question, answer => {
    if (answer === "y") {
      testKey = sendVerificationEmail();
      rl.close();
    } else {
      console.log("Email not sent");
      rl.close();
    }
  });
}
