import Mailjet from "node-mailjet";
import dotenv from "dotenv";

dotenv.config();

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_API_SECRET,
);
// const mailjet = require("node-mailjet").connect(
//   process.env.MAILJET_API_KEY,
//   process.env.MAILJET_API_SECRET
// );

export const mailjetTransport = async function (mailOptions) {
  const { recipient, subject, emailTemplate, text } = mailOptions;

  return mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          // Email: "admin@auth_system.com", // doesn't work as it requires proper domains
          Email: "fuyad5266@gmail.com",
          Name: "Admin | Auth_System",
        },
        To: [
          {
            Email: recipient.email,
            Name: recipient.name,
          },
        ],
        Subject: subject,
        TextPart: text,
        HTMLPart: emailTemplate,
      },
    ],
  });
};
