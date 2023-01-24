import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
import { signEmailVerification } from "./jwtSign";
import { testUser } from "../services/sendTestEmail";

dotenv.config({ path: __dirname + "./../../.env.local" });
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendVerificationEmail(): Promise<string> {
  const verificationKey = signEmailVerification(testUser);

  const link = `http://${process.env.HOST}:${process.env.SERVER_PORT}/api/verify?key=${verificationKey}`;

  const message = {
    to: testUser.email,
    from: "attila.huszar@outlook.com",
    subject: "Email verification - Fox Ticket",
    text: `Please verify your email by copying this link to the browser window: ${link}`,
    html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;">
      <h1 style="padding: 20px; text-align: center;">
        <img src="https://ams02pap001files.storage.live.com/y4msjTbBRoUnECddDsR_L75gdxST96UH9pxH5az2WXLSTaO5AtY4mtpT0ZsP0r-BK8ESVM9DMhvcdPEj7R99jlgPGEYouL7ezI03ofy10ZyIZLUtnYJhBsR_SzCoLDhPZKZEyJ_B5ioab6QbxbHcal1WMzo6lr-_k8PzFvn_uWtGvzuIdk6j4f1KsE5GDi8xhOK?width=256&height=255&cropmode=none" width="100" height="100" />
        <b>Fox</b>Ticket
      </h1>
      <h2 style="text-align: center;">Please verify your email by clicking <b><a href=${link}>this link</a></b>.</h2>
      <p style="text-align: center;"><i>Link is valid for 24 hours.</i></p>
    </div>`,
  };

  sgMail
    .send(message)
    .then(() => {
      console.log(`Email sent to ${testUser.email}`);
    })
    .catch(error => {
      console.error(error.response.body.errors);
    });

  return verificationKey;
}
