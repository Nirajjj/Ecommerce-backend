import nodemailer from "nodemailer";
import { EMAIL_PASS, EMAIL_USER } from "../config/env.js";

export const sendEmail = async ({
  name,
  email,
  phone,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER, // your gmail
      pass: EMAIL_PASS, // app password
    },
  });

  await transporter.sendMail({
    from: `"Vexora Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // you receive mail
    subject: "New Contact Message",
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  });
};
