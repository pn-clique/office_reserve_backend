import {badRequestResponse, errorResponse, HttpResponse, successResponse, UseCase } from "../../../@shareds/contracts";
import Prisma from "../../../infra/database/prisma-db";
import { PlaceEntity } from "../../entities";

export class DeletePlaceUseCase implements UseCase {
  async execute(request: PlaceEntity): Promise<HttpResponse<any>> {
    try {
      const places = await Prisma.place.findUnique({ where: { id: request.id } });

      if(!places) {
        return badRequestResponse({ message: 'Place not found' });
      }

      const place = await Prisma.place.delete({ where: { id: request.id }})
      return successResponse(places);
    }catch (error: any) {
      return errorResponse(error);
    }
  }
}