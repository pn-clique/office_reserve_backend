"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSocialUserController = void 0;
const useCases_1 = require("../../../app/useCases");
const enums_1 = require("../../../@shareds/enums");
class LoginSocialUserController {
    async handle(request, response) {
        const { name, email, phone, photo } = request.body;
        const useCase = new useCases_1.LoginSocialUserUseCase();
        const index = await useCase.execute({
            name,
            email,
            phone,
            photo,
            typeUser: enums_1.TYPE_USER.USER,
        });
        return response.status(index.status).json(index.data);
    }
}
exports.LoginSocialUserController = LoginSocialUserController;
