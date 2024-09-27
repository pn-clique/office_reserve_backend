"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePlaceController = void 0;
const useCases_1 = require("../../../app/useCases");
class CreatePlaceController {
    async handle(request, response) {
        const { name, capacity } = request.body;
        let photo = '';
        if (request.file) {
            const file = request.file;
            photo = file?.firebaseUrl || '';
        }
        const capacityInt = +capacity;
        const useCase = new useCases_1.CreatePlaceUseCase();
        const index = await useCase.execute({ name, capacity: capacityInt, photo });
        return response.status(index.status).json(index.data);
    }
}
exports.CreatePlaceController = CreatePlaceController;
