import { Request, Response } from "express";
import { _Controller } from "../../../@shareds/contracts";
import { CreateBookingUseCase } from "../../../app/useCases";


export class CreateBookingController implements _Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { description, finalDate, initDate, modalityId, placeId, email, endTime, name, phone, startTime } = request.body;

    const useCase = new CreateBookingUseCase();

    const index = await useCase.execute({
      description,
      finalDate,
      initDate,
      modalityId,
      placeId,
      email,
      endTime,
      name,
      phone,
      startTime,
    });

    return response.status(index.status).json(index.data);
  }
}