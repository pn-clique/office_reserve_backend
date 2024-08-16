import {
  badRequestResponse,
  errorResponse,
  HttpResponse,
  successResponse,
  UseCase,
} from "../../../@shareds/contracts";
import Prisma from "../../../infra/database/prisma-db";
import { UserEntity } from "../../entities";

export class EditUserUseCase implements UseCase {
  async execute(request: UserEntity): Promise<HttpResponse<any>> {
    try {
      const findUser = await Prisma.user.findUnique({
        where: { id: request.id },
      });

      if (!findUser) {
        return badRequestResponse({
          message: "User not exists",
        });
      }

      request.name = request.name ?? findUser.name;
      request.email = request.email ?? findUser.email;
      request.phone = request.phone ?? findUser.phone;
      const photo =  request.photo  === '' ? findUser.photo : request.photo;


      const user = await Prisma.user.update({ where: { id: request.id }, data: 
      {
        name: request.name,
        phone: request.phone,
        email: request.email,
        photo: photo,
      } });

      return successResponse(user);
    } catch (error: any) {
      return errorResponse(error);
    }
  }
}
