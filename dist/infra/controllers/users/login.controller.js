"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const useCases_1 = require("../../../app/useCases");
class LoginController {
    async handle(request, response) {
        const { email, password } = request.body;
        const useCase = new useCases_1.LoginUseCase();
        const index = await useCase.execute({ email, password });
        return response.status(index.status).json(index.data);
    }
}
exports.LoginController = LoginController;
