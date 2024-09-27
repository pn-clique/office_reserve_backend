"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllReportsController = void 0;
const useCases_1 = require("../../../app/useCases");
class AllReportsController {
    async handle(request, response) {
        const { id } = request.params;
        const useCase = new useCases_1.AllReportsUseCase();
        const index = await useCase.execute({ id });
        return response.status(index.status).json(index.data);
    }
}
exports.AllReportsController = AllReportsController;
