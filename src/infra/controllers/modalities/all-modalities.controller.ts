import { Request, Response } from "express";
import { _Controller } from "../../../@shareds/contracts";
import { AllModalityUseCase } from "../../../app/useCases";

export class AllModalityController implements _Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const useCase = new AllModalityUseCase();

    const index = await useCase.execute();
    return response.status(index.status).json(index.data);
  }
}