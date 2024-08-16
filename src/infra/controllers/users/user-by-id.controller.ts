import { Request, Response } from "express";
import { _Controller } from "../../../@shareds/contracts";
import { UserByIdUseCase } from "../../../app/useCases";
import { UserEntity } from "../../../app/entities";

export class UserByIDController implements _Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const useCase = new UserByIdUseCase();

    const index = await useCase.execute({ id } as UserEntity);
    
    return response.status(index.status).json(index.data);
  }
}