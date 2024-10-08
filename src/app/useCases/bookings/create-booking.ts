import dayjs from "dayjs";
import {
  badRequestResponse,
  errorResponse,
  HttpResponse,
  successResponse,
  UseCase,
} from "../../../@shareds/contracts";
import { TYPE_USER } from "../../../@shareds/enums";
import { ICreateBookingRequest } from "../../../@shareds/interfaces/create-booking-interface";
import Prisma from "../../../infra/database/prisma-db";
import { BOOKING_STATUS } from "../../../@shareds/enums/booking-status";
import { GenerateReference } from "../../../@shareds/utils/funtions";
import { CreatePurchaseUseCase } from "../purchases/create-purchase";
import { EmisIntegrationService } from "../emis/create-reference-payment";
import jwt from "jsonwebtoken";

export class CreateBookingUseCase implements UseCase {
  async execute(request: ICreateBookingRequest): Promise<HttpResponse<any>> {
    try {
      const {
        description,
        finalDate,
        initDate,
        modalityId,
        placeId,
        email,
        endTime,
        name,
        phone,
        startTime,
      } = request;
      let user;
      
      const userExists = await Prisma.user.findUnique({ where: { email } });
      if (!userExists) {
        user = await Prisma.user.create({
          data: { email, name, phone, type_user: TYPE_USER.USER },
        });
      } else {
        user = userExists;
      }

      const [modalities, place] = await Promise.all([
        Prisma.modality.findUnique({ where: { id: modalityId } }),
        Prisma.place.findUnique({ where: { id: placeId } }),
      ]);

      if (!modalities || !place) {
        return badRequestResponse({ message: "Modality or Place not found" });
      }

      if (dayjs(initDate).isAfter(dayjs(finalDate))) {
        return badRequestResponse({
          message: "Start date must be before final date",
        });
      }

      const booking = await Prisma.booking.create({
        data: {
          user_id: user.id,
          place_id: place.id,
          modality_id: modalityId,
          init_date: initDate,
          final_date: finalDate,
          description: description,
          start_time: startTime,
          end_time: endTime,
          status: BOOKING_STATUS.PENDING,
          reference: String(GenerateReference()),
        },
      });

      const reducingCapacity = place.capacity - 1;
      const mostRequired = place.most_required && place.most_required + 1;

      await Prisma.place.update({
        where: { id: place.id },
        data: {
          capacity: reducingCapacity,
          most_required: mostRequired
        },
      });

      const priceWithoutDot = modalities.price.toString().replace(".", "");
      const amount = parseFloat(priceWithoutDot);

      const emisIntegrationService = new EmisIntegrationService();
      const payment = await emisIntegrationService.generatePaymentReference({
        value: amount,
        plan: `${place.name} - ${modalities.name}`,
        firstName: user.name.split(" ")[0],
        lastName: user.name.split(" ")[1],
        email: user.email,
        mobile: String(user.phone).trim(),
        identifier: booking.reference,
      });

      // TODO: Validar se a pessoa passou o nome completo ou não

      const purchaseOrder = new CreatePurchaseUseCase();
      await purchaseOrder.execute({ bookingId: booking.id });

      const token = jwt.sign(
        { userId: user.id },
        "e0836deb27a4e0e9f2cb4a0f67a33c85",
        { expiresIn: "1d" }
      );

      const data = { booking, user, token, payment };
      return successResponse(data);
    } catch (error: any) {
      return errorResponse(error);
    }
  }
}
