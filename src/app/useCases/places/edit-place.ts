import {
  badRequestResponse,
  errorResponse,
  HttpResponse,
  successResponse,
  UseCase,
} from "../../../@shareds/contracts";
import Prisma from "../../../infra/database/prisma-db";
import { PlaceEntity } from "../../entities/place-entity";

export class EditPlaceUseCase implements UseCase {
  async execute(request: PlaceEntity): Promise<HttpResponse<any>> {
    try {
      const findPlace = await Prisma.place.findUnique({
        where: { id: request.id },
      });

      if (!findPlace) {
        return badRequestResponse({
          message: "Place not exists",
        });
      }

      request.name = request.name ?? findPlace.name;
      request.capacity = request.capacity ?? findPlace.capacity;
      const photo =  request.photo  === '' ? findPlace.photo : request.photo;


      const place = await Prisma.place.update({ where: { id: request.id }, data: 
      {
        name: request.name,
        capacity: request.capacity,
        photo: photo,
      } });

      return successResponse(place);
    } catch (error: any) {
      return errorResponse(error);
    }
  }
}
