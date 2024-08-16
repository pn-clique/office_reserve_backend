import {badRequestResponse, errorResponse, HttpResponse, successResponse, UseCase } from "../../../@shareds/contracts";
import Prisma from "../../../infra/database/prisma-db";
import { UserEntity } from "../../entities";

export class UserByIdUseCase implements UseCase {
  async execute(request: UserEntity): Promise<HttpResponse<any>> {
    try {
      const user = await Prisma.user.findUnique({ where: { id: request.id } });

      if(!user) {
        return badRequestResponse({ message: 'User not found' });
      }

      return successResponse(user);
    }catch (error: any) {
      return errorResponse(error);
    }
  }
}