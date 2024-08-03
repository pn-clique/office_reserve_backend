import { Request, Response } from "express";
import { _Controller } from "../../../@shareds/contracts";
import { CreatePlaceUseCase } from "../../../app/useCases";

export class CreatePlaceController implements _Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, capacity, photo } = request.body;

    const useCase = new CreatePlaceUseCase();

    const index = await useCase.execute({ name, capacity, photo });
    return response.status(index.status).json(index.data);
  }
}