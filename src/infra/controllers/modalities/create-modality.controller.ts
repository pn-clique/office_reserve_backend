import { Request, Response } from "express";
import { _Controller } from "../../../@shareds/contracts";
import { CreateModalityUseCase } from "../../../app/useCases";

export class CreateModalityController implements _Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, price, duration } = request.body;

    const useCase = new CreateModalityUseCase();

    const index = await useCase.execute({ name, description, price, duration  });
    return response.status(index.status).json(index.data);
  }
}