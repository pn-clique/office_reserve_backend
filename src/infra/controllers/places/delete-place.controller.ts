import { Request, Response } from "express";
import { _Controller } from "../../../@shareds/contracts";
import { DeletePlaceUseCase } from "../../../app/useCases";
import { PlaceEntity } from "../../../app/entities";

export class DeletePlaceController implements _Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const useCase = new DeletePlaceUseCase();

    const index = await useCase.execute({ id } as PlaceEntity);

    return response.status(index.status).json(index.data);
  }
}
