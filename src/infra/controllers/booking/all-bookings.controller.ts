import { Request, Response } from "express";
import { _Controller } from "../../../@shareds/contracts";
import { AllBookingsUseCase } from "../../../app/useCases";


export class AllBookingsController implements _Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const useCase = new AllBookingsUseCase();

    const index = await useCase.execute();

    return response.status(index.status).json(index.data);
  }
}