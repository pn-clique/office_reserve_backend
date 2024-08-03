import {errorResponse, HttpResponse, successResponse, UseCase } from "../../../@shareds/contracts";
import Prisma from "../../../infra/database/prisma-db";


export class AllPlaceUseCase implements UseCase {
  async execute(): Promise<HttpResponse<any>> {
    try {
      const places = await Prisma.place.findMany();

      return successResponse(places);
    }catch (error: any) {
      return errorResponse(error);
    }
  }
}