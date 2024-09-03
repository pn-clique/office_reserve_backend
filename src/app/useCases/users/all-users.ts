import {
  errorResponse,
  HttpResponse,
  successResponse,
  UseCase,
} from "../../../@shareds/contracts";
import { TYPE_USER } from "../../../@shareds/enums";
import Prisma from "../../../infra/database/prisma-db";

export class AllUsersUseCase implements UseCase {
  async execute(): Promise<HttpResponse<any>> {
    try {
      const users = await Prisma.user.findMany({
        where: {
          NOT: {
            type_user: TYPE_USER.ADMIN,
          },
        },
      });

      return successResponse(users);
    } catch (error: any) {
      return errorResponse(error);
    }
  }
}
