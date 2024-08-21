import { Request, Response } from "express";
import { _Controller } from "../../../@shareds/contracts";
import { LoginSocialUserUseCase } from "../../../app/useCases";
import { UserEntity } from "../../../app/entities";
import { TYPE_USER } from "../../../@shareds/enums";

export class LoginSocialUserController implements _Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, phone, photo } = request.body;

    const useCase = new LoginSocialUserUseCase();
    const index = await useCase.execute({
      name,
      email,
      phone,
      photo,
      typeUser: TYPE_USER.USER,
    } as UserEntity);
    return response.status(index.status).json(index.data);
  }
}
