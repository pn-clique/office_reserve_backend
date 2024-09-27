"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditPlaceController = void 0;
const useCases_1 = require("../../../app/useCases");
class EditPlaceController {
    async handle(request, response) {
        const { name, capacity } = request.body;
        const { id } = request.params;
        let photo = '';
        if (request.file) {
            const file = request.file;
            photo = file?.firebaseUrl || '';
        }
        const capacityInt = +capacity;
        const useCase = new useCases_1.EditPlaceUseCase();
        const index = await useCase.execute({ id, name, capacity: capacityInt, photo });
        return response.status(index.status).json(index.data);
    }
}
exports.EditPlaceController = EditPlaceController;
