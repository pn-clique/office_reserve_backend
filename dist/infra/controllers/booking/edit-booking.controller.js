"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditBookingController = void 0;
const useCases_1 = require("../../../app/useCases");
class EditBookingController {
    async handle(request, response) {
        const { status } = request.body;
        const { id } = request.params;
        const useCase = new useCases_1.EditBookingUseCase();
        const index = await useCase.execute({ id, status });
        return response.status(index.status).json(index.data);
    }
}
exports.EditBookingController = EditBookingController;
