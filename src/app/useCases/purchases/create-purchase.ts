import { badRequestResponse, errorResponse, HttpResponse, successResponse, UseCase } from "../../../@shareds/contracts";
import Prisma from "../../../infra/database/prisma-db";
import { PurchaseOrderEntity } from "../../entities/purchase-order-entity";


export class CreatePurchaseUseCase implements UseCase {
  async execute(request: PurchaseOrderEntity): Promise<HttpResponse<any>> {
    try {
      const booking = await Prisma.booking.findUnique({ where: { id: request.bookingId }, include: { modality: true } });

      if(!booking) {
        return badRequestResponse({ message: 'Booking not found' });
      }

      const purchaseOrder = await Prisma.purchaseOrder.create({ data: {
        booking_id: request.bookingId,
        total_price: booking.modality.price,
      }});

      return successResponse(purchaseOrder);
    }catch (error: any) {
      return errorResponse(error);
    }
  }
}