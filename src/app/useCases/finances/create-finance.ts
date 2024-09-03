import {
  badRequestResponse,
  errorResponse,
  HttpResponse,
  successResponse,
  UseCase,
} from "../../../@shareds/contracts";
import Prisma from "../../../infra/database/prisma-db";
import { FinanceEntity } from "../../entities";

export class CreateFinanceUseCase implements UseCase {
  async execute(request: FinanceEntity): Promise<HttpResponse<any>> {
    try {

      const finance = await Prisma.finance.create({ data: request });

      return successResponse(finance);
    } catch (error: any) {
      return errorResponse(error);
    }
  }
}
