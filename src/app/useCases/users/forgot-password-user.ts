import {
  badRequestResponse,
  errorResponse,
  HttpResponse,
  successResponse,
  UseCase,
} from "../../../@shareds/contracts";
import { SendMail } from "../../../@shareds/utils/email";
import Prisma from "../../../infra/database/prisma-db";
import { UserEntity } from "../../entities";
import crypto from "crypto";

export class ForgotPasswordUserUseCase implements UseCase {
  async execute(request: UserEntity): Promise<HttpResponse<any>> {
    try {
      const findUser = await Prisma.user.findUnique({
        where: { email: request.email },
      });

      if (!findUser) {
        return badRequestResponse({
          message: "User not exists",
        });
      }

      const token_password = crypto.randomBytes(4).toString("hex");

      const date_reset_password = new Date();
      date_reset_password.setHours(date_reset_password.getHours() + 1);

      request.password_token = token_password;
      request.password_Expires = date_reset_password;

      const user = await Prisma.user.update({
        where: { id: findUser.id },
        data: {
          password_token: request.password_token,
          password_Expires: request.password_Expires,
        },
      });

      await this.notifyUserByEmail({
        email: user.email,
        identifier: token_password,
        name: user.name,
      });

      

      return successResponse(user);
    } catch (error: any) {
      return errorResponse(error);
    }
  }

  private async notifyUserByEmail({
    identifier,
    email,
    name,
  }: {
    identifier: string;
    email: string;
    name: string;
  }) {
    return new SendMail().execute({
      to: email ?? "",
      html: `
        <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Código para Resetar a sua Senha</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px; margin-bottom: 20px;">
            <img src="logo_url_aqui" alt="Logo da Empresa" style="max-width: 150px;">
            <h1 style="margin: 0; color: #333333;">Código para Resetar a sua Senha </h1>
        </div>
        <div style="margin-bottom: 20px;">
            <h2 style="color: #333333; border-bottom: 1px solid #e0e0e0; padding-bottom: 5px;">Informações do Cliente</h2>
            <p style="margin: 5px 0; color: #666666;"><strong>Olá </strong> ${name}</p>
            <p style="margin: 5px 0; color: #666666;">Estamos entrando em contato para confirmar o seu endereço de email. Para mudar a sua palavra, use o seguinte código 
                <span style="font-weight:700;color:#21b7de;"> <strong>${identifier}</strong> </span>
                que deverá ser inserido no campo de verificação no nosso sistema. Essa é uma medida importante para garantir a segurança da sua conta e garantir que
                você tenha acesso total a todas as funcionalidades que oferecemos.
            </p> 
        </div>
        <div style="text-align: center; color: #999999; font-size: 12px;">
            <p style="margin: 5px 0;">&copy; ${new Date().getFullYear()} PN Clique. Todos os direitos reservados.</p>
            <p style="margin: 5px 0;">Se você tem alguma dúvida, entre em contato conosco.</p>
        </div>
    </div>
</body>
</html>

      `,
      subject: "[PN Clique Coworking] Código para Resetar a sua Senha ✔ ",
    });
  }
}
