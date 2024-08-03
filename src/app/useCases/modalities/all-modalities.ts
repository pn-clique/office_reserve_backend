import {errorResponse, HttpResponse, successResponse, UseCase } from "../../../@shareds/contracts";
import Prisma from "../../../infra/database/prisma-db";

export class AllModalityUseCase implements UseCase {
  async execute(): Promise<HttpResponse<any>> {
    try {
      const modalities = await Prisma.modality.findMany();

      return successResponse(modalities);

    }catch (error: any) {
      return errorResponse(error);
    }
  }

}