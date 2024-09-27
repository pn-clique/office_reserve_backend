"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsByReferenceController = void 0;
const useCases_1 = require("../../../app/useCases");
class BookingsByReferenceController {
    async handle(request, response) {
        const { reference } = request.params;
        const useCase = new useCases_1.BookingByReferenceUseCase();
        const index = await useCase.execute(reference);
        return response.status(index.status).json(index.data);
    }
}
exports.BookingsByReferenceController = BookingsByReferenceController;
