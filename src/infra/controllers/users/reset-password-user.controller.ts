import { Request, Response } from "express";
import { _Controller } from "../../../@shareds/contracts";
import {
  ForgotPasswordUserUseCase,
  ResetPasswordUserUseCase,
} from "../../../app/useCases";
import { UserEntity } from "../../../app/entities";

export class ResetPasswordUserController implements _Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password, password_token } = request.body;

    const useCase = new ResetPasswordUserUseCase();

    const index = await useCase.execute({
      email,
      password,
      password_token,
    } as UserEntity);
    return response.status(index.status).json(index.data);
  }
}
