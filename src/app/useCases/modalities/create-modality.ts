import { badRequestResponse, errorResponse, HttpResponse, successResponse, UseCase } from "../../../@shareds/contracts";
import Prisma from "../../../infra/database/prisma-db";
import { ModalityEntity } from "../../entities/modality-entity";

export class CreateModalityUseCase implements UseCase {
  async execute(request: ModalityEntity): Promise<HttpResponse<any>> {
    try {
      const { name, description, price, duration } = request;

      if(!name || !description || !price || !duration) {
        return badRequestResponse({ message: 'All fields are required' });
      }

      if(price <= 0 || duration <= 0) {
        return badRequestResponse({ message: 'Price and duration must be greater than 0' });
      }
      const modality = await Prisma.modality.create({ data: request });

      return successResponse(modality);
    }catch (error: any) {
      return errorResponse(error);
    }
  }

}