"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllUsersController = void 0;
const useCases_1 = require("../../../app/useCases");
class AllUsersController {
    async handle(request, response) {
        const useCase = new useCases_1.AllUsersUseCase();
        const index = await useCase.execute();
        return response.status(index.status).json(index.data);
    }
}
exports.AllUsersController = AllUsersController;
