"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllPlaceController = void 0;
const useCases_1 = require("../../../app/useCases");
class AllPlaceController {
    async handle(request, response) {
        const useCase = new useCases_1.AllPlaceUseCase();
        const index = await useCase.execute();
        return response.status(index.status).json(index.data);
    }
}
exports.AllPlaceController = AllPlaceController;
