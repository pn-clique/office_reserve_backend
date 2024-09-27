import { badRequestResponse, errorResponse, HttpResponse, successResponse, UseCase } from "../../../@shareds/contracts";
import Prisma from "../../../infra/database/prisma-db";
import { UserEntity } from "../../entities/user-entity";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export class CreateUserUseCase implements UseCase{
  async execute(request: UserEntity): Promise<HttpResponse<any>> {
    try {
      const email = await Prisma.user.findUnique({ where: { email: request.email } });
      if(email) {
        return badRequestResponse({ message: "Email already exists" });
      }
      let password;
      if(request.password) {
        const salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(request.password, salt);
      }

      const user = await Prisma.user.create({
        data: {
          name: request.name,
          email: request.email,
          password,
          phone: request.phone,
          type_user: request.typeUser,
        },
      });

      const token = jwt.sign({ userId: user.id }, 'e0836deb27a4e0e9f2cb4a0f67a33c85', { expiresIn: '1d' });

      const data = { user, token };

      return successResponse(data);

    }catch (error: any) {
      return errorResponse(error);
    }
  }
}