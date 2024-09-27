// import sgMail from '@sendgrid/mail';
import nodemailer from 'nodemailer';
import { errorResponse } from '../contracts';

type IEmailItems = {
  to: string;
  subject: string;
  text?: string;
  html: string;
};

export class SendMail {
  async execute({ to, subject, html, text }: IEmailItems): Promise<any> {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: "pnclique@gmail.com",
          pass: "ooboivoyvcyeebtr",
        },
      });

      await transporter.sendMail({
        from: "PN-Clique pnclique@gmail.com",
        to,
        subject,
        html,
        text,
      });
      return true;
    } catch (error: any) {
      return errorResponse(error);
    }
  }
}
