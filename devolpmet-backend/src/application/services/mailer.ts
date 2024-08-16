import { IMailer } from "../../interface/serviceInterface/mailerInterface";
import { envConfig } from "../../config/envConfig";
import nodemailer from "nodemailer";

export class EmailService implements IMailer {
  constructor() {}
  async sendEmail(
    recipient: string,
    type: string,
    message: string
  ): Promise<any> {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: envConfig.EMAIL_USER,
        pass: envConfig.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: "GetExpert",
      to: recipient,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${message}`,
    };
    try {
      let info = await transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      throw error;
    }
  }
}
