import { Request, Response } from "express";
import { _Controller } from "../../../@shareds/contracts";
import { BookingByReferenceUseCase } from "../../../app/useCases";


export class BookingsByReferenceController implements _Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { reference } = request.params as { reference: string };
    const useCase = new BookingByReferenceUseCase();

    const index = await useCase.execute(reference);

    return response.status(index.status).json(index.data);
  }
}