// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
import { User } from "../interfaces/User";
import { mockUsers } from "./mockUsers";
import { signEmailVerification } from "./jwtSign";

dotenv.config({ path: __dirname + "./../../.env.local" });
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const user: User = mockUsers[2];

export async function sendVerificationEmail(): Promise<string> {
  const verificationKey = signEmailVerification(user);

  const link = `http://${process.env.HOST}:${process.env.SERVER_PORT}/verify?key=${verificationKey}`;

  const message = {
    to: user.email,
    from: "attila.huszar@outlook.com",
    subject: "Email verification - Fox Ticket",
    text: `Please verify your email by copying this link to the browser window: ${link}`,
    html: `<h2 style="text-align: center;">Please verify your email by clicking <strong><a href=${link}>this link</a></strong></h2><p style="text-align: center;"><em>Link is valid for 24 hours<em></p>`,
  };

  sgMail
    .send(message)
    .then(() => {
      console.log(`Email sent to ${user.email}`);
    })
    .catch(error => {
      console.error(error.response.body.errors);
    });

  return verificationKey;
}
