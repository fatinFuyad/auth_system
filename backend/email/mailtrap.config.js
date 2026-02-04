import dotenv from "dotenv";
import { MailtrapClient } from "mailtrap";
import { htmlToText } from "html-to-text";

dotenv.config();

export const emailClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Admin | Auth_System",
};

export const recipients = [
  {
    email: "fuyad5266@gmail.com",
  },
];

export const sendEmail = async function (options) {
  const { to, subject, emailTemplate, category } = options;
  await emailClient.send({
    from: sender,
    to: [
      {
        email: to,
      },
    ],
    subject,
    text: htmlToText(emailTemplate),
    html: emailTemplate,
    category, //: "Integration Test",
  });
};
