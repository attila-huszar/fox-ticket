// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

const link = `http://localhost:3000/verify/?key=abcd`;

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
const msg = {
  to: "cinkes@gmail.com", // Change to your recipient
  from: "attila.huszar@outlook.com", // Change to your verified sender
  subject: "Email verification - Fox Ticket",
  text: "",
  html: `Please verify your email by clicking <strong><a href=${link}>this link</a></strong>`,
};
sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch(error => {
    console.error(error);
  });
