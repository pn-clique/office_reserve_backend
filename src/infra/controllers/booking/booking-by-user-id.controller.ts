import { Request, Response } from "express";
import { _Controller } from "../../../@shareds/contracts";
import { BookingByUserIdUseCase } from "../../../app/useCases";


export class BookingsByUserIdController implements _Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params as { id: string };
    const useCase = new BookingByUserIdUseCase();

    const index = await useCase.execute(id);

    return response.status(index.status).json(index.data);
  }
}