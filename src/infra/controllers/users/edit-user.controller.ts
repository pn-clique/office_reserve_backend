import { Request, Response } from "express";
import { _Controller } from "../../../@shareds/contracts";
import {  EditUserUseCase } from "../../../app/useCases";
import { CustomFile } from "../../../helpers/interfaces/file.interface";
import { UserEntity } from "../../../app/entities";


export class EditUserController implements _Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, phone, email  } = request.body;
    const { id } = request.params;
    let photo: string = ''; 
      if (request.file) {
        const file = request.file as CustomFile
        photo = file?.firebaseUrl || ''
      }

    const useCase = new EditUserUseCase();

    const index = await useCase.execute({ id, name, phone, photo, email } as UserEntity);
    return response.status(index.status).json(index.data);
  }
}