import { Request, Response } from "express";
import { _Controller } from "../../../@shareds/contracts";
import { EditPlaceUseCase } from "../../../app/useCases";
import { CustomFile } from "../../../helpers/interfaces/file.interface";
import { PlaceEntity } from "../../../app/entities";


export class EditPlaceController implements _Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, capacity } = request.body;
    const { id } = request.params;
    let photo: string = ''; 
      if (request.file) {
        const file = request.file as CustomFile
        photo = file?.firebaseUrl || ''
      }

      const capacityInt = +capacity

    const useCase = new EditPlaceUseCase();

    const index = await useCase.execute({ id, name, capacity: capacityInt, photo } as PlaceEntity);
    return response.status(index.status).json(index.data);
  }
}