import { badRequestResponse, errorResponse, HttpResponse, successResponse, UseCase } from "../../../@shareds/contracts";
import Prisma from "../../../infra/database/prisma-db";
import { PlaceEntity } from "../../entities/place-entity";


export class CreatePlaceUseCase implements UseCase {
  async execute(request: PlaceEntity): Promise<HttpResponse<any>> {
    try {
      console.log({ request })
      if(request.capacity <= 0) {
        return badRequestResponse({ message: "Capacity must be greater than 0" });
      }
      const place = await Prisma.place.create({ data: request });

      return successResponse(place);
    }catch (error: any) {
      return errorResponse(error);
    }
  }
}