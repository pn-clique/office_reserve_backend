"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFinanceController = void 0;
const useCases_1 = require("../../../app/useCases");
class GetFinanceController {
    async handle(request, response) {
        const useCase = new useCases_1.GetFinanceUseCase();
        const index = await useCase.execute();
        return response.status(index.status).json(index.data);
    }
}
exports.GetFinanceController = GetFinanceController;
