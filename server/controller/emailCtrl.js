import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";

export const sendEmail = asyncHandler(async (data, req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.email.com",
    port: 587,
    secure: false, // `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PWD,
    },
  });
  async function main() {
    try {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"Vrushab Kudchi 👻" <kudchivrushab@gmail.com>',
        to: data.to,
        subject: data.subject,
        text: data.text,
        html: data.html,
      });

      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      throw new Error(error);
    }
  }
  main().catch(console.error);
});
