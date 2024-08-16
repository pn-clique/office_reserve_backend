import {errorResponse, HttpResponse, successResponse, UseCase } from "../../../@shareds/contracts";
import Prisma from "../../../infra/database/prisma-db";


export class AllUsersUseCase implements UseCase {
  async execute(): Promise<HttpResponse<any>> {
    try {
      const users = await Prisma.user.findMany();

      return successResponse(users);
    }catch (error: any) {
      return errorResponse(error);
    }
  }
}