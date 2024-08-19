import {
  badRequestResponse,
  errorResponse,
  HttpResponse,
  successResponse,
  UseCase,
} from "../../../@shareds/contracts";
import Prisma from "../../../infra/database/prisma-db";

export class BookingByUserIdUseCase implements UseCase {
  async execute(request: string): Promise<HttpResponse<any>> {
    try {
      const booking = await Prisma.booking.findMany({
        where: { user_id: request },
        include: { user: true, place: true, modality: true },
      });
      if (!booking) {
        return badRequestResponse({ message: "User not have bookings" });
      }
      return successResponse(booking);
    } catch (error: any) {
      return errorResponse(error);
    }
  }
}
