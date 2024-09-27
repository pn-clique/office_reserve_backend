"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const useCases_1 = require("../../../app/useCases");
class CreateUserController {
    async handle(request, response) {
        const { name, email, password, phone, typeUser } = request.body;
        const useCase = new useCases_1.CreateUserUseCase();
        const index = await useCase.execute({
            name,
            email,
            password,
            phone,
            typeUser,
        });
        return response.status(index.status).json(index.data);
    }
}
exports.CreateUserController = CreateUserController;
