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
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `PN-Clique <${process.env.EMAIL_USER}>`,
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
