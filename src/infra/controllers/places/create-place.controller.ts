import { Request, Response } from "express";
import { _Controller } from "../../../@shareds/contracts";
import { CreatePlaceUseCase } from "../../../app/useCases";
import { CustomFile } from "../../../helpers/interfaces/file.interface";
import { PlaceEntity } from "../../../app/entities";


export class CreatePlaceController implements _Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, capacity } = request.body;
    let photo: string = ''; 
      if (request.file) {
        const file = request.file as CustomFile
        photo = file?.firebaseUrl || ''
      }

      const capacityInt = +capacity

    const useCase = new CreatePlaceUseCase();

    const index = await useCase.execute({ name, capacity: capacityInt, photo } as PlaceEntity);
    return response.status(index.status).json(index.data);
  }
}