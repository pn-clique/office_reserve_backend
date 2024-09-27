"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllModalityController = void 0;
const useCases_1 = require("../../../app/useCases");
class AllModalityController {
    async handle(request, response) {
        const useCase = new useCases_1.AllModalityUseCase();
        const index = await useCase.execute();
        return response.status(index.status).json(index.data);
    }
}
exports.AllModalityController = AllModalityController;
