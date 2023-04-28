import { createTransport } from "nodemailer";

export const sendEail = async (to, subject, text) => {
  const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  //   use mailtrap
  await transporter.sendMail({ to, subject, text });
};
