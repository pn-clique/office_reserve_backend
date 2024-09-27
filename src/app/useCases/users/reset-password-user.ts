import {
  badRequestResponse,
  errorResponse,
  HttpResponse,
  successResponse,
  UseCase,
} from "../../../@shareds/contracts";
import Prisma from "../../../infra/database/prisma-db";
import { UserEntity } from "../../entities";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export class ResetPasswordUserUseCase implements UseCase {
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

      if (request.password_token !== findUser?.password_token) {
        return badRequestResponse({
          message: "Code invalid.",
        });
      }

      const now = new Date();

      if (findUser?.password_Expires) {
        if (now > findUser?.password_Expires) {
          return badRequestResponse({
            message: "Token expired, generate a new token.",
          });
        }
        
      }

      let password;
      if(request.password) {
        const salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(request.password, salt);
      }

      const user = await Prisma.user.update({
        where: { id: findUser.id },
        data: {
          password: password
        },
      });

      const token = jwt.sign({ userId: user.id }, 'e0836deb27a4e0e9f2cb4a0f67a33c85', { expiresIn: '1d' });

      const data = { user, token };

      return successResponse(data);
    } catch (error: any) {
      return errorResponse(error);
    }
  }

}
