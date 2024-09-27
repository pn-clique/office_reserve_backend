"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallBackUseCase = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const booking_status_1 = require("../../../@shareds/enums/booking-status");
const prisma_db_1 = __importDefault(require("../../../infra/database/prisma-db"));
const contracts_1 = require("../../../@shareds/contracts");
const email_1 = require("../../../@shareds/utils/email");
const currency_js_1 = __importDefault(require("currency.js"));
class CallBackUseCase {
    async execute({ status, signature, identifier, data }) {
        try {
            const booking = await prisma_db_1.default.booking.findUnique({
                where: { reference: identifier },
                include: { modality: true, user: true },
            });
            if (status === "success" && booking) {
                await prisma_db_1.default.booking.update({
                    where: { reference: identifier },
                    data: { status: booking_status_1.BOOKING_STATUS.CONFIRMED },
                });
                const finance = await prisma_db_1.default.finance.findFirst();
                const numberValue = Math.trunc(data.amount);
                let addValue;
                if (finance) {
                    addValue = finance.value + numberValue;
                    await prisma_db_1.default.finance.update({
                        where: { id: finance?.id },
                        data: { value: addValue },
                    });
                }
                await this.notifyUserByEmail({
                    amount: data.amount,
                    email: booking.user.email,
                    identifier,
                    description: booking.description ?? "",
                    modality: booking.modality.name,
                    name: booking.user.name,
                    phone: booking.user.phone ?? "",
                    startDate: (0, dayjs_1.default)(booking.init_date).format("DD/MM/YYYY"),
                    startTime: booking.start_time,
                });
            }
            return (0, contracts_1.successResponse)(true);
        }
        catch (error) {
            return (0, contracts_1.errorResponse)(error);
        }
    }
    async notifyUserByEmail({ identifier, amount, email, name, phone, startDate, startTime, modality, description, }) {
        const KZ = (value) => (0, currency_js_1.default)(value, { precision: 0, symbol: "kz" });
        const kzFormatted = KZ(amount).format();
        return new email_1.SendMail().execute({
            to: email ?? "",
            html: `
        <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório de Reserva</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px; margin-bottom: 20px;">
            <img src="https://i.ibb.co/6rw0nGZ/PN.jpg" alt="Logo da Empresa" style="max-width: 150px;">
            <h1 style="margin: 0; color: #333333;">Relatório de Reserva #${identifier}</h1>
        </div>
        <div style="margin-bottom: 20px;">
            <h2 style="color: #333333; border-bottom: 1px solid #e0e0e0; padding-bottom: 5px;">Informações do Cliente</h2>
            <p style="margin: 5px 0; color: #666666;"><strong>Nome:</strong> ${name}</p>
            <p style="margin: 5px 0; color: #666666;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0; color: #666666;"><strong>Telefone:</strong> ${phone}</p>
        </div>
        <div style="margin-bottom: 20px;">
            <h2 style="color: #333333; border-bottom: 1px solid #e0e0e0; padding-bottom: 5px;">Detalhes da Reserva</h2>
            <p style="margin: 5px 0; color: #666666;"><strong>Data da Reserva:</strong> ${startDate}</p>
            <p style="margin: 5px 0; color: #666666;"><strong>Hora da Reserva:</strong> ${startTime}</p>
            <p style="margin: 5px 0; color: #666666;"><strong>Serviço Reservado:</strong> ${modality}</p>
            <p style="margin: 5px 0; color: #666666;"><strong>Observações:</strong> ${description}</p>
            <p style="margin: 5px 0; color: #666666;"><strong>TOTAL PAGO:</strong> ${kzFormatted}</p>
        </div>
        <div style="text-align: center; color: #999999; font-size: 12px;">
            <p style="margin: 5px 0;">&copy; ${new Date().getFullYear()} PN Clique. Todos os direitos reservados.</p>
            <p style="margin: 5px 0;">Se você tem alguma dúvida, entre em contato conosco.</p>
        </div>
    </div>
</body>
</html>

      `,
            subject: "Reserva Confirmada com Sucesso!",
        });
    }
}
exports.CallBackUseCase = CallBackUseCase;
