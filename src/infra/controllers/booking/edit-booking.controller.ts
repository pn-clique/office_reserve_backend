import { Request, Response } from "express";
import { _Controller } from "../../../@shareds/contracts";
import { EditBookingUseCase } from "../../../app/useCases";
import { BookingEntity } from "../../../app/entities";


export class EditBookingController implements _Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { status } = request.body;
    const { id } = request.params;

    const useCase = new EditBookingUseCase();

    const index = await useCase.execute({ id, status } as BookingEntity);
    return response.status(index.status).json(index.data);
  }
}