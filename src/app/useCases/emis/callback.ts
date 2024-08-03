import dayjs from "dayjs";
import { BOOKING_STATUS } from "../../../@shareds/enums/booking-status";
import Prisma from "../../../infra/database/prisma-db";
import { errorResponse } from "../../../@shareds/contracts";
import { SendMail } from "../../../@shareds/utils/email";

interface ICallbackProps {
  status: any;
  signature: any;
  identifier: any;
  data: any;
}
export class CallBackUseCase {
  async execute({ status, signature, identifier, data }: ICallbackProps) {
    try {
      const booking = await Prisma.booking.findUnique({
        where: { reference: identifier },
        include: { modality: true, user: true },
      });

      if (status === 'success' && booking) {
          await Prisma.booking.update({
            where: { reference: identifier },
            data: { status: BOOKING_STATUS.CONFIRMED },
          })

          await this.notifyUserByEmail({
            amount: data.amount,
            email: booking.user.email,
            identifier,
            description: booking.description ?? '',
            modality: booking.modality.name,
            name: booking.user.name,
            phone: booking.user.phone ?? '',
            startDate: dayjs(booking.init_date).format('DD/MM/YYYY'),
            startTime: dayjs(booking.start_time).format('HH:mm'),
          });
        }
        return true;
    } catch (error: any) {
      return errorResponse(error.message);
    }
  }
  private async notifyUserByEmail({
    identifier,
    amount,
    email,
     name,
     phone,
     startDate,
     startTime,
     modality,
     description,
  }: {
    identifier: string;
    amount: number;
    email: string;
    name: string;
    phone: string;
    startDate: String;
    startTime: String;
    modality: string;
    description: string;
  }) {

    return new SendMail().execute({
      to: email ?? '',
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
            <img src="logo_url_aqui" alt="Logo da Empresa" style="max-width: 150px;">
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
            <p style="margin: 5px 0; color: #666666;"><strong>TOTAL PAGO:</strong> ${amount}</p>
        </div>
        <div style="text-align: center; color: #999999; font-size: 12px;">
            <p style="margin: 5px 0;">&copy; ${new Date().getFullYear()} PN Clique. Todos os direitos reservados.</p>
            <p style="margin: 5px 0;">Se você tem alguma dúvida, entre em contato conosco.</p>
        </div>
    </div>
</body>
</html>

      `,
      subject: 'Reserva Confirmada com Sucesso!',
    });
  }
}
