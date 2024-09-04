import { Request, Response } from "express";
import { _Controller } from "../../../@shareds/contracts";
import { AllReportsUseCase } from "../../../app/useCases";
import { UserEntity } from "../../../app/entities";

export class AllReportsController implements _Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const useCase = new AllReportsUseCase();
    const index = await useCase.execute({ id } as UserEntity);
    return response.status(index.status).json(index.data);
  }
}
