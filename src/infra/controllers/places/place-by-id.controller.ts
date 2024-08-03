import { Request, Response } from "express";
import { _Controller } from "../../../@shareds/contracts";
import { PlaceByIdUseCase } from "../../../app/useCases";

export class PlaceByIDController implements _Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const useCase = new PlaceByIdUseCase();

    const index = await useCase.execute(id);
    
    return response.status(index.status).json(index.data);
  }
}