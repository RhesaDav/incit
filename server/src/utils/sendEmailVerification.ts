import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_PASSWORD,
    to: email,
    subject: "Email Verification",
    html: `<p>Please verify your email by clicking on the following link:</p>
             <a href="${process.env.BASE_URL_CLIENT}/verify-email?token=${token}">Verify Email</a>`,
  };

  await transporter.sendMail(mailOptions);
};
