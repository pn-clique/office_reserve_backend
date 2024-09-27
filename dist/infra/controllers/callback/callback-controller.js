"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallBackController = void 0;
const emis_1 = require("../../../app/useCases/emis");
class CallBackController {
    async handle(request, response) {
        const { data, signature, identifier, status } = request.body;
        const useCase = new emis_1.CallBackUseCase();
        const index = await useCase.execute({ status, signature, identifier, data });
        return response.status(index.status).json(index.data);
    }
}
exports.CallBackController = CallBackController;
