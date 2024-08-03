import { Request, Response } from "express";
import { _Controller } from "../../../@shareds/contracts";
import { AllPlaceUseCase } from "../../../app/useCases";

export class AllPlaceController implements _Controller {
  async handle(request: Request, response: Response): Promise<Response> {

    const useCase = new AllPlaceUseCase();

    const index = await useCase.execute();
    return response.status(index.status).json(index.data);
  }
}