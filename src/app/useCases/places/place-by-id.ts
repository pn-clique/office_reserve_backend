import {badRequestResponse, errorResponse, HttpResponse, successResponse, UseCase } from "../../../@shareds/contracts";
import Prisma from "../../../infra/database/prisma-db";

export class PlaceByIdUseCase implements UseCase {
  async execute(request: string): Promise<HttpResponse<any>> {
    try {
      const places = await Prisma.place.findUnique({ where: { id: request } });

      if(!places) {
        return badRequestResponse({ message: 'Place not found' });
      }

      return successResponse(places);
    }catch (error: any) {
      return errorResponse(error);
    }
  }
}