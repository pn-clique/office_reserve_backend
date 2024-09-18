import { Request, Response } from "express";
import { _Controller } from "../../../@shareds/contracts";
import { CallBackUseCase, ICallbackProps } from "../../../app/useCases/emis";

export class CallBackController implements _Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { data, signature, identifier, status } = request.body;
    const useCase = new CallBackUseCase();

    const index = await useCase.execute({ status, signature, identifier, data });
    return response.status(index.status).json(index.data);
  }
}