import { Request, Response } from "express";
import { _Controller } from "../../../@shareds/contracts";
import { CallBackUseCase, ICallbackProps } from "../../../app/useCases/emis";

export class CallBackController implements _Controller {
  async handle(request: Request<any, any, ICallbackProps>, response: Response): Promise<Response> {
    const { status, signature, identifier, data} = request.body;
    const useCase = new CallBackUseCase();

    const index = await useCase.execute({ status, signature, identifier, data });

    return response.status(index.status).json(index.data);
  }
}