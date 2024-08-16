import { Request, Response } from "express";
import { _Controller } from "../../../@shareds/contracts";
import { AllUsersUseCase } from "../../../app/useCases";

export class AllUsersController implements _Controller {
  async handle(request: Request, response: Response): Promise<Response> {

    const useCase = new AllUsersUseCase();

    const index = await useCase.execute();
    return response.status(index.status).json(index.data);
  }
}