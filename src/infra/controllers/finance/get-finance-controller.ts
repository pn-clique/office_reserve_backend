import { Request, Response } from "express";
import { _Controller } from "../../../@shareds/contracts";
import { GetFinanceUseCase } from "../../../app/useCases";

export class GetFinanceController implements _Controller {
  async handle(request: Request, response: Response): Promise<Response> {

    const useCase = new GetFinanceUseCase();

    const index = await useCase.execute();
    return response.status(index.status).json(index.data);
  }
}