import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // App Email
    pass: process.env.EMAIL_PASS, // App Password
  },
});

interface MailOptions {
  from: string | undefined;
  to: string | undefined;
  subject: string;
  html: string;
}

export const sendEmail = async ({ from, to, subject, html }: MailOptions) => {
  try {
    await transporter.sendMail({
      from, // sender address
      to,
      subject,
      html,
    });
    console.log(`Email sent to ${Array.isArray(to) ? to.join(", ") : to}`);
  } catch (error) {
    throw new Error(`Error sending email: ${error}`);
  }
};
