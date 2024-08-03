import {badRequestResponse, errorResponse, HttpResponse, successResponse, UseCase } from "../../../@shareds/contracts";
import Prisma from "../../../infra/database/prisma-db";

export class GetModalityByIDUseCase implements UseCase {
  async execute(request: string): Promise<HttpResponse<any>> {
    try {
      const modalities = await Prisma.modality.findUnique({ where: { id: request } });

      if(!modalities) {
        return badRequestResponse({ message: 'Modality not found' });
      }

      return successResponse(modalities);

    }catch (error: any) {
      return errorResponse(error);
    }
  }

}