import { badRequestResponse, errorResponse, HttpResponse, successResponse, UseCase } from "../../../@shareds/contracts";
import Prisma from "../../../infra/database/prisma-db";
import { UserEntity } from "../../entities/user-entity";
import bcrypt from "bcrypt";

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

      return successResponse(user);

    }catch (error: any) {
      return errorResponse(error);
    }
  }
}