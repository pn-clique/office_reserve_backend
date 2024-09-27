"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBookingController = void 0;
const useCases_1 = require("../../../app/useCases");
class CreateBookingController {
    async handle(request, response) {
        const { description, finalDate, initDate, modalityId, placeId, email, endTime, name, phone, startTime } = request.body;
        const useCase = new useCases_1.CreateBookingUseCase();
        const index = await useCase.execute({
            description,
            finalDate,
            initDate,
            modalityId,
            placeId,
            email,
            endTime,
            name,
            phone,
            startTime
        });
        return response.status(index.status).json(index.data);
    }
}
exports.CreateBookingController = CreateBookingController;
