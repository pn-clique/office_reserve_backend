"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordUserController = void 0;
const useCases_1 = require("../../../app/useCases");
class ResetPasswordUserController {
    async handle(request, response) {
        const { email, password, password_token } = request.body;
        const useCase = new useCases_1.ResetPasswordUserUseCase();
        const index = await useCase.execute({
            email,
            password,
            password_token,
        });
        return response.status(index.status).json(index.data);
    }
}
exports.ResetPasswordUserController = ResetPasswordUserController;
