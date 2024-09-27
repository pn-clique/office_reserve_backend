"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMail = void 0;
// import sgMail from '@sendgrid/mail';
const nodemailer_1 = __importDefault(require("nodemailer"));
const contracts_1 = require("../contracts");
class SendMail {
    async execute({ to, subject, html, text }) {
        try {
            const transporter = nodemailer_1.default.createTransport({
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
        }
        catch (error) {
            return (0, contracts_1.errorResponse)(error);
        }
    }
}
exports.SendMail = SendMail;
