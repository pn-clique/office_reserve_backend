"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllBookingsController = void 0;
const useCases_1 = require("../../../app/useCases");
class AllBookingsController {
    async handle(request, response) {
        const useCase = new useCases_1.AllBookingsUseCase();
        const index = await useCase.execute();
        return response.status(index.status).json(index.data);
    }
}
exports.AllBookingsController = AllBookingsController;
