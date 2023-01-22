// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
import { UserJwt } from "../interfaces/User";
import { mockUsers } from "./mockUsers";
import { signEmailVerification } from "./jwtSign";

dotenv.config({ path: __dirname + "./../../.env.local" });
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const user: UserJwt = mockUsers[2];

export async function sendVerificationEmail(): Promise<string> {
  const verificationKey = signEmailVerification(user);

  const link = `http://${process.env.HOST}:${process.env.SERVER_PORT}/verify?key=${verificationKey}`;

  const message = {
    to: user.email,
    from: "attila.huszar@outlook.com",
    subject: "Email verification - Fox Ticket",
    text: `Please verify your email by copying this link to the browser window: ${link}`,
    html: `<div style="font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif; text-align: center;"<h1 style="padding: 20px;"><img src="https://ams02pap001files.storage.live.com/y4msjTbBRoUnECddDsR_L75gdxST96UH9pxH5az2WXLSTaO5AtY4mtpT0ZsP0r-BK8ESVM9DMhvcdPEj7R99jlgPGEYouL7ezI03ofy10ZyIZLUtnYJhBsR_SzCoLDhPZKZEyJ_B5ioab6QbxbHcal1WMzo6lr-_k8PzFvn_uWtGvzuIdk6j4f1KsE5GDi8xhOK?width=256&height=255&cropmode=none" width="56" height="55" /><b>Fox</b>Ticket</h1>
    <h2>Please verify your email by clicking <b><a href=${link}>this link</a></b>.</h2><p><i>Link is valid for 24 hours.<i></p>`,
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
