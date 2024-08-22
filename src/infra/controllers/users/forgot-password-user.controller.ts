import { Request, Response } from "express";
import { _Controller } from "../../../@shareds/contracts";
import {  ForgotPasswordUserUseCase } from "../../../app/useCases";
import { UserEntity } from "../../../app/entities";


export class ForgotPasswordUserController implements _Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email  } = request.body;

    const useCase = new ForgotPasswordUserUseCase();

    const index = await useCase.execute({ email } as UserEntity);
    return response.status(index.status).json(index.data);
  }
}