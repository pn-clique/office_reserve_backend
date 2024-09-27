"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceByIDController = void 0;
const useCases_1 = require("../../../app/useCases");
class PlaceByIDController {
    async handle(request, response) {
        const { id } = request.params;
        const useCase = new useCases_1.PlaceByIdUseCase();
        const index = await useCase.execute(id);
        return response.status(index.status).json(index.data);
    }
}
exports.PlaceByIDController = PlaceByIDController;
