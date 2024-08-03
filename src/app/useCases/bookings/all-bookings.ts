import { errorResponse, HttpResponse, successResponse, UseCase } from "../../../@shareds/contracts";
import Prisma from "../../../infra/database/prisma-db";


export class AllBookingsUseCase implements UseCase {
  async execute(): Promise<HttpResponse<any>> {
    try {
      const bookings = await Prisma.booking.findMany({
        include: {
          user: true,
          place: true,
          modality: true,
        },
      });

      return successResponse(bookings);

    } catch (error: any) {
      return errorResponse(error);
    }
  }

}