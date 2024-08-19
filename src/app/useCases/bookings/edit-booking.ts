import {
  badRequestResponse,
  errorResponse,
  HttpResponse,
  successResponse,
  UseCase,
} from "../../../@shareds/contracts";
import Prisma from "../../../infra/database/prisma-db";
import { BookingEntity } from "../../entities";

export class EditBookingUseCase implements UseCase {
  async execute(request: BookingEntity): Promise<HttpResponse<any>> {
    try {
      const findBooking = await Prisma.booking.findUnique({
        where: { id: request.id },
      });

      if (!findBooking) {
        return badRequestResponse({
          message: "Booking not exists",
        });
      }

      const booking = await Prisma.booking.update({
        where: { id: request.id },
        data: {
          status: request.status,
        },
      });

      return successResponse(booking);
    } catch (error: any) {
      return errorResponse(error);
    }
  }
}
