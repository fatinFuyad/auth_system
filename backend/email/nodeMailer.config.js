import { config } from "dotenv";
import { htmlToText } from "html-to-text";
import { MailtrapClient } from "mailtrap";
import nodemailer from "nodemailer";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

config();

export class Email {
  constructor(user) {
    this.from = process.env.EMAIL_FROM;
    this.to = user.email;
    this.userName = user.name;
  }

  transporter() {
    if (process.env.NODE_ENV === "production") {
      return new MailtrapClient({
        token: process.env.MAILTRAP_TOKEN,
      });
    }

    return nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      secure: false, // Use true for port 465, false for port 587
      auth: {
        user: process.env.NODEMAILER_USERNAME,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
  }

  async send(options) {
    console.log("Email sending");
    const { to, subject, emailTemplate, category } = options;

    // send emails with mailtrap in production
    if (process.env.NODE_ENV === "production") {
      // return await sendEmail(options);
      return await this.transporter().send({
        from: {
          email: "hello@demomailtrap.co",
          name: "Admin | Auth_System",
        },
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
    }

    // send emails with nodemailer transporter in development
    await this.transporter().sendMail({
      from: this.from,
      to,
      subject,
      text: htmlToText(emailTemplate), // Plain-text version of the message
      html: emailTemplate, // HTML version of the message
    });
  }

  async sendWelcome() {
    await this.send({
      to: this.to,
      subject: "Thanks for joining with us",
      emailTemplate: WELCOME_EMAIL_TEMPLATE.replace("[USERNAME]", this.userName),
      category: "Welcome Email",
    });
  }

  async passwordResetEmail(resetToken) {
    await this.send({
      to: this.to,
      subject: "Your password reset token (valid for 10 mins)",
      emailTemplate: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
        "[RESET_URL]",
        `${process.env.CLIENT_URL}/reset-password/${resetToken}`,
      ),
      category: "Password Reset",
    });
  }

  async passwordResetSuccessEmail() {
    await this.send({
      to: this.to,
      subject: "Your password reset action was successful",
      emailTemplate: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Reset Success",
    });
  }

  async verifyEmail(verificationToken) {
    await this.send({
      to: this.to,
      subject: "Verify your email address",
      emailTemplate: VERIFICATION_EMAIL_TEMPLATE.replace(
        "[VERIFICATION_CODE]",
        verificationToken,
      ),
      category: "Email Verification",
    });
  }
}

/////////////////

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
/**
 
 
export const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.NODEMAILER_USERNAME,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

// Send an email using async/await
export const sendEmail = async (options) => {
  const { to, subject, emailTemplate } = options;

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text: htmlToText(emailTemplate), // Plain-text version of the message
    html: emailTemplate, // HTML version of the message
  });

  console.log("Message sent:", info.messageId);
};
*/
