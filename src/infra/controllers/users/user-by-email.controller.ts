import { Request, Response } from "express";
import { _Controller } from "../../../@shareds/contracts";
import { UserByEmailUseCase } from "../../../app/useCases";
import { UserEntity } from "../../../app/entities";

export class UserByEmailController implements _Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.params;

    const useCase = new UserByEmailUseCase();

    const index = await useCase.execute({ email } as UserEntity);
    
    return response.status(index.status).json(index.data);
  }
}