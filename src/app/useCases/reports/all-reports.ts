import {
  errorResponse,
  badRequestResponse,
  HttpResponse,
  successResponse,
  UseCase,
} from "../../../@shareds/contracts";
import Prisma from "../../../infra/database/prisma-db";
import { UserEntity } from "../../entities";

export class AllReportsUseCase implements UseCase {
  async execute(request:UserEntity): Promise<HttpResponse<any>> {
    try {
      const user = await Prisma.user.findMany({
        where: {
          id: request.id,
        },
        select: {
          Booking : {
            select:{
                place:true,
                PurchaseOrder:true,
                modality:true
            }
          },
          
        }
      });
      if (!user) {
        return badRequestResponse({ message: "User not found" });
      }
      const [bookings] = user;

      return successResponse(bookings);
    } catch (error: any) {
      return errorResponse(error);
    }
  }
}
