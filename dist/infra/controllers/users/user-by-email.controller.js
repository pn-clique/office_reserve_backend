"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserByEmailController = void 0;
const useCases_1 = require("../../../app/useCases");
class UserByEmailController {
    async handle(request, response) {
        const { email } = request.params;
        const useCase = new useCases_1.UserByEmailUseCase();
        const index = await useCase.execute({ email });
        return response.status(index.status).json(index.data);
    }
}
exports.UserByEmailController = UserByEmailController;
