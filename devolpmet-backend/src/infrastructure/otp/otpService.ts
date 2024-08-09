import nodemailer from "nodemailer";
import { envConfig } from '../../config/envConfig';

export const generateOTP = (): string => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString(); 
    console.log("otp is", otp);
    return otp;
};

export const sendOTP = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", 
    port: 587, 
    secure: false, 
    auth: {
      user: envConfig.EMAIL_USER, 
      pass: envConfig.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: envConfig.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP");
  }
};
