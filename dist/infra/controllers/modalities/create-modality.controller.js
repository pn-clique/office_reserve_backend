"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateModalityController = void 0;
const useCases_1 = require("../../../app/useCases");
class CreateModalityController {
    async handle(request, response) {
        const { name, description, price, duration } = request.body;
        const useCase = new useCases_1.CreateModalityUseCase();
        const index = await useCase.execute({ name, description, price, duration });
        return response.status(index.status).json(index.data);
    }
}
exports.CreateModalityController = CreateModalityController;
