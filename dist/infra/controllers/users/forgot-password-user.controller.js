"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordUserController = void 0;
const useCases_1 = require("../../../app/useCases");
class ForgotPasswordUserController {
    async handle(request, response) {
        const { email } = request.body;
        const useCase = new useCases_1.ForgotPasswordUserUseCase();
        const index = await useCase.execute({ email });
        return response.status(index.status).json(index.data);
    }
}
exports.ForgotPasswordUserController = ForgotPasswordUserController;
