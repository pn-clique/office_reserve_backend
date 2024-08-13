import { Request, Response } from "express";
import { _Controller } from "../../../@shareds/contracts";
import { CreateUserUseCase } from "../../../app/useCases";
import { TYPE_USER } from "../../../@shareds/enums";

export class CreateUserController implements _Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, phone } = request.body;

    const useCase = new CreateUserUseCase();
    const index = await useCase.execute({
      name,
      email,
      password,
      phone,
      typeUser: TYPE_USER.USER,
    });
    return response.status(index.status).json(index.data);
  }
}
