import { emailVerify } from "./emailVerify";
import readline from "readline";

export let verificationKey: Promise<string>;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askTestEmail(question: string) {
  rl.question(question, answer => {
    if (answer === "y") {
      verificationKey = sendTestEmail();
      rl.close();
    } else {
      console.log("Email not sent");
      rl.close();
    }
  });
}

function sendTestEmail(): Promise<string> {
  const key = emailVerify();
  return key;
}

setTimeout(() => {
  askTestEmail("Send test email? (y/n*):\n");
});
