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
      let password;
      if(request.password) {
        const salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(request.password, salt);
      } else {
        password = findUser.password
      }


      const user = await Prisma.user.update({ where: { id: request.id }, data: 
      {
        name: request.name,
        phone: request.phone,
        email: request.email,
        photo: photo,
        password: password
      } });

      return successResponse(user);
    } catch (error: any) {
      return errorResponse(error);
    }
  }
}
