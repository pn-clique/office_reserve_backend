"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFinanceController = void 0;
const useCases_1 = require("../../../app/useCases");
class CreateFinanceController {
    async handle(request, response) {
        const { value } = request.body;
        const valueInt = +value;
        const useCase = new useCases_1.CreateFinanceUseCase();
        const index = await useCase.execute({
            value: valueInt
        });
        return response.status(index.status).json(index.data);
    }
}
exports.CreateFinanceController = CreateFinanceController;
