import { badRequestResponse, errorResponse, HttpResponse, successResponse, UseCase } from "../../../@shareds/contracts";
import Prisma from "../../../infra/database/prisma-db";

export class BookingByIDUseCase implements UseCase {
  async execute(request: string): Promise<HttpResponse<any>> {
    try {
      const booking = await Prisma.booking.findUnique({ where: { id: request }, include: { user: true, place: true, modality: true, } });
      if(!booking) {
        return badRequestResponse({ message: 'Booking not found' });
      }
      return successResponse(booking);
    } catch (error: any) {
      return errorResponse(error);
    }
  }

}