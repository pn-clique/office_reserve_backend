"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditUserController = void 0;
const useCases_1 = require("../../../app/useCases");
class EditUserController {
    async handle(request, response) {
        const { name, phone, email } = request.body;
        const { id } = request.params;
        let photo = '';
        if (request.file) {
            const file = request.file;
            photo = file?.firebaseUrl || '';
        }
        const useCase = new useCases_1.EditUserUseCase();
        const index = await useCase.execute({ id, name, phone, photo, email });
        return response.status(index.status).json(index.data);
    }
}
exports.EditUserController = EditUserController;
