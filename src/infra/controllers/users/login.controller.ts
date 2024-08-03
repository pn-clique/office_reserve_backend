import { Request, Response } from "express";
import { _Controller } from "../../../@shareds/contracts";
import { LoginUseCase } from "../../../app/useCases";

export class LoginController implements _Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body as { email: string, password: string };

    const useCase = new LoginUseCase();

    const index = await useCase.execute({ email, password });

    return response.status(index.status).json(index.data);
  }

}