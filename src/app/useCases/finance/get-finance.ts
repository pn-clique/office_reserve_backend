import {errorResponse, HttpResponse, successResponse, UseCase } from "../../../@shareds/contracts";
import Prisma from "../../../infra/database/prisma-db";


export class GetFinanceUseCase implements UseCase {
  async execute(): Promise<HttpResponse<any>> {
    try {
      const finance = await Prisma.finance.findFirst();

      return successResponse(finance);
    }catch (error: any) {
      return errorResponse(error);
    }
  }
}