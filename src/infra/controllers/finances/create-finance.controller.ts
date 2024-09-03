import { Request, Response } from "express";
import { _Controller } from "../../../@shareds/contracts";
import { CreateFinanceUseCase } from "../../../app/useCases";
import { FinanceEntity } from "../../../app/entities";

export class CreateFinanceController implements _Controller {
  async handle(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { value } = request.body;
    const valueInt = +value;

    const useCase = new CreateFinanceUseCase();

    const index = await useCase.execute({
      value: valueInt
    } as FinanceEntity);
    return response.status(index.status).json(index.data);
  }
}
